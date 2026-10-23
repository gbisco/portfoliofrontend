export const MAX_MESSAGE_LENGTH = 500
export const CHAT_REQUEST_TIMEOUT_MS = 105000

export function clipChatMessage(value) {
  if (typeof value !== 'string') {
    return ''
  }

  if (value.length <= MAX_MESSAGE_LENGTH) {
    return value
  }

  let end = MAX_MESSAGE_LENGTH
  const previous = value.charCodeAt(end - 1)
  const next = value.charCodeAt(end)

  if (
    previous >= 0xd800 &&
    previous <= 0xdbff &&
    next >= 0xdc00 &&
    next <= 0xdfff
  ) {
    end -= 1
  }

  return value.slice(0, end)
}

const GENERIC_UNREACHABLE =
  'The assistant could not be reached. Please try again.'
const GENERIC_FAILURE =
  "The assistant couldn't complete your request. Please try again."

export const KNOWN_BACKEND_ERROR_CODES = new Set([
  'unauthorized',
  'authentication_unavailable',
  'invalid_request',
  'conversation_expired',
  'invalid_conversation',
  'account_blocked',
  'user_daily_limit',
  'global_hourly_limit',
  'global_daily_limit',
  'usage_service_unavailable',
  'ai_service_unavailable',
  'configuration_error',
  'method_not_allowed',
])

export const SUBMISSION_LOCKED_CODES = new Set([
  'account_blocked',
  'user_daily_limit',
])

export function isChatSubmissionLocked(code) {
  return SUBMISSION_LOCKED_CODES.has(code)
}

export class ChatRequestError extends Error {
  constructor(message, { code = null, status = null } = {}) {
    super(message)
    this.name = 'ChatRequestError'
    this.code = code
    this.status = status
  }
}

function readErrorPayload(payload, status) {
  const code = typeof payload?.error === 'string' ? payload.error : null

  if (!code || !KNOWN_BACKEND_ERROR_CODES.has(code)) {
    return new ChatRequestError(GENERIC_FAILURE, { status })
  }

  const message =
    typeof payload?.message === 'string' && payload.message.trim()
      ? payload.message.trim()
      : GENERIC_FAILURE

  return new ChatRequestError(message, { code, status })
}

export async function sendChatMessage({
  message,
  conversationId,
  conversationToken,
  idToken,
  signal,
}) {
  const apiUrl = import.meta.env.VITE_CHAT_API_URL

  if (typeof apiUrl !== 'string' || !apiUrl.trim()) {
    throw new ChatRequestError(
      'The assistant is temporarily unavailable.',
      { code: 'configuration_error', status: 500 }
    )
  }

  if (typeof idToken !== 'string' || !idToken.trim()) {
    throw new ChatRequestError(
      'Please sign in with Google to use the assistant.',
      { code: 'unauthorized', status: 401 }
    )
  }

  if (typeof conversationId !== 'string' || !conversationId) {
    throw new ChatRequestError('The chat request is invalid.', {
      code: 'invalid_request',
      status: 400,
    })
  }

  const trimmedMessage = typeof message === 'string' ? message.trim() : ''

  if (!trimmedMessage || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    throw new ChatRequestError('The chat request is invalid.', {
      code: 'invalid_request',
      status: 400,
    })
  }

  const body = {
    message: trimmedMessage,
    conversation_id: conversationId,
  }

  if (typeof conversationToken === 'string' && conversationToken) {
    body.conversation_token = conversationToken
  }

  const controller = new AbortController()
  const abort = () => controller.abort()

  if (signal) {
    if (signal.aborted) {
      abort()
    } else {
      signal.addEventListener('abort', abort, { once: true })
    }
  }

  const timeoutId = window.setTimeout(abort, CHAT_REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    let payload = null

    try {
      payload = await response.json()
    } catch {
      throw new ChatRequestError(GENERIC_FAILURE, {
        status: response.status,
      })
    }

    if (!response.ok) {
      throw readErrorPayload(payload, response.status)
    }

    if (
      typeof payload?.message !== 'string' ||
      !payload.message.trim() ||
      typeof payload.conversation_id !== 'string' ||
      typeof payload.conversation_token !== 'string' ||
      !payload.conversation_token
    ) {
      throw new ChatRequestError(GENERIC_FAILURE, {
        status: response.status,
      })
    }

    return {
      message: payload.message.trim(),
      conversationId: payload.conversation_id,
      conversationToken: payload.conversation_token,
    }
  } catch (error) {
    if (error instanceof ChatRequestError) {
      throw error
    }

    if (error?.name === 'AbortError') {
      if (signal?.aborted) {
        throw new ChatRequestError('Request cancelled.', {
          code: 'aborted',
        })
      }

      throw new ChatRequestError(
        'The assistant took too long to respond. Please try again.',
        { code: 'timeout' }
      )
    }

    throw new ChatRequestError(GENERIC_UNREACHABLE, { code: 'unreachable' })
  } finally {
    window.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abort)
  }
}
