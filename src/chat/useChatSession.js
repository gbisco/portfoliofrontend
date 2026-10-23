import { useCallback, useEffect, useRef, useState } from 'react'

import { useGoogleAuth } from '../auth/GoogleAuthContext'
import {
  isChatSubmissionLocked,
  MAX_MESSAGE_LENGTH,
  sendChatMessage,
} from './sendChatMessage'

function createConversationId() {
  return crypto.randomUUID()
}

function markLastUserMessageFailed(current) {
  if (current.length === 0) {
    return current
  }

  const last = current[current.length - 1]

  if (last.role !== 'user' || last.status === 'failed') {
    return current
  }

  return [
    ...current.slice(0, -1),
    { ...last, status: 'failed' },
  ]
}

function appendOrReuseUserMessage(current, message) {
  const last = current[current.length - 1]

  if (last?.role === 'user' && last.status === 'failed' && last.text === message) {
    return [
      ...current.slice(0, -1),
      { role: 'user', text: message },
    ]
  }

  return [
    ...current,
    { role: 'user', text: message },
  ]
}

export function useChatSession() {
  const { idToken, isSignedIn, profile, signOut } = useGoogleAuth()
  const [conversationId, setConversationId] = useState(createConversationId)
  const [conversationToken, setConversationToken] = useState(null)
  const [messages, setMessages] = useState([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)
  const subjectRef = useRef(profile?.subject || null)
  const wasSignedInRef = useRef(isSignedIn)
  const requestGenerationRef = useRef(0)
  const abortRef = useRef(null)

  const resetContinuity = useCallback(() => {
    setConversationId(createConversationId())
    setConversationToken(null)
  }, [])

  const resetChat = useCallback(() => {
    requestGenerationRef.current += 1
    abortRef.current?.abort()
    abortRef.current = null
    resetContinuity()
    setMessages([])
    setError(null)
    setIsSending(false)
  }, [resetContinuity])

  useEffect(() => {
    const subject = profile?.subject || null

    if (subjectRef.current && subject && subjectRef.current !== subject) {
      resetChat()
    }

    if (subject) {
      subjectRef.current = subject
    }
  }, [profile?.subject, resetChat])

  useEffect(() => {
    if (wasSignedInRef.current && !isSignedIn) {
      requestGenerationRef.current += 1
      abortRef.current?.abort()
      abortRef.current = null
      setError(null)
      setIsSending(false)
      setMessages(markLastUserMessageFailed)
    }

    wasSignedInRef.current = isSignedIn
  }, [isSignedIn])

  const handleSignOut = useCallback(() => {
    resetChat()
    subjectRef.current = null
    signOut()
  }, [resetChat, signOut])

  const sendMessage = useCallback(async (rawMessage) => {
    if (isSending || isChatSubmissionLocked(error?.code)) {
      return
    }

    const message = typeof rawMessage === 'string' ? rawMessage.trim() : ''

    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      return
    }

    const generation = requestGenerationRef.current
    const controller = new AbortController()
    abortRef.current = controller

    setIsSending(true)
    setError(null)
    setMessages((current) => appendOrReuseUserMessage(current, message))

    try {
      const result = await sendChatMessage({
        message,
        conversationId,
        conversationToken,
        idToken,
        signal: controller.signal,
      })

      if (generation !== requestGenerationRef.current) {
        return
      }

      setConversationId(result.conversationId)
      setConversationToken(result.conversationToken)
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: result.message },
      ])
    } catch (requestError) {
      if (
        generation !== requestGenerationRef.current ||
        requestError?.code === 'aborted'
      ) {
        return
      }

      const code = requestError?.code || null

      setMessages(markLastUserMessageFailed)

      if (code === 'conversation_expired' || code === 'invalid_conversation') {
        resetContinuity()
      }

      if (code === 'unauthorized') {
        setError(null)
        signOut({
          message: 'Please sign in with Google to use the assistant.',
        })
        return
      }

      setError({
        code,
        message:
          requestError?.message ||
          "The assistant couldn't complete your request. Please try again.",
      })
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null
      }

      if (generation === requestGenerationRef.current) {
        setIsSending(false)
      }
    }
  }, [
    conversationId,
    conversationToken,
    error?.code,
    idToken,
    isSending,
    resetContinuity,
    signOut,
  ])

  return {
    error,
    handleSignOut,
    isSending,
    isSignedIn,
    messages,
    profile,
    sendMessage,
  }
}
