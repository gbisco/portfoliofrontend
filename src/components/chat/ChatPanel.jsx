import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import {
  clipChatMessage,
  isChatSubmissionLocked,
  MAX_MESSAGE_LENGTH,
} from '../../chat/sendChatMessage'
import ChatMessage from './ChatMessage'
import ChatThinkingIndicator from './ChatThinkingIndicator'

const GREETING =
  "Hi! I'm Gabriel's AI assistant. I can help you learn about my projects, experience, and technical background. What would you like to know?"

const SUGGESTIONS = [
  'Tell me about Gabriel',
  'What has Gabriel been building?',
  "What's Gabriel's background?",
]

const NEAR_BOTTOM_PX = 72

function isNearBottom(element) {
  return (
    element.scrollHeight - element.scrollTop - element.clientHeight
    <= NEAR_BOTTOM_PX
  )
}

function ChatPanel({
  error,
  isSending,
  messages,
  onSend,
}) {
  const [draft, setDraft] = useState('')
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const stickToBottomRef = useRef(true)
  const trimmedDraft = draft.trim()
  const characterCount = draft.length
  const submissionLocked = isChatSubmissionLocked(error?.code)
  const composerDisabled = isSending || submissionLocked
  const atLimit = characterCount >= MAX_MESSAGE_LENGTH
  const nearLimit = characterCount >= MAX_MESSAGE_LENGTH - 50
  const canSend =
    Boolean(trimmedDraft) &&
    characterCount <= MAX_MESSAGE_LENGTH &&
    !composerDisabled
  const showIntro = messages.length === 0 && !isSending
  const lastMessageIndex = messages.length - 1

  useEffect(() => {
    if (messages.length === 0) {
      stickToBottomRef.current = true
    }
  }, [messages.length])

  useEffect(() => {
    const list = listRef.current

    if (!list || !stickToBottomRef.current) {
      return
    }

    list.scrollTop = list.scrollHeight
  }, [error, isSending, messages])

  useLayoutEffect(() => {
    const input = inputRef.current

    if (!input) {
      return
    }

    input.style.height = 'auto'
    input.style.height = `${input.scrollHeight}px`
  }, [draft])

  function handleScroll() {
    const list = listRef.current

    if (!list) {
      return
    }

    stickToBottomRef.current = isNearBottom(list)
  }

  function submitDraft() {
    if (!canSend) {
      return
    }

    const message = trimmedDraft
    setDraft('')
    onSend(message)
  }

  function handleSubmit(event) {
    event.preventDefault()
    submitDraft()
  }

  function handleComposerKeyDown(event) {
    if (event.key !== 'Enter' || event.shiftKey) {
      return
    }

    if (event.nativeEvent.isComposing || event.keyCode === 229) {
      return
    }

    event.preventDefault()
    submitDraft()
  }

  function handleDraftChange(event) {
    setDraft(clipChatMessage(event.target.value))
  }

  function handlePaste(event) {
    const pasted = event.clipboardData?.getData('text')

    if (typeof pasted !== 'string') {
      return
    }

    event.preventDefault()

    const input = event.target
    const start = input.selectionStart ?? draft.length
    const end = input.selectionEnd ?? draft.length
    const next = clipChatMessage(
      `${draft.slice(0, start)}${pasted}${draft.slice(end)}`
    )
    const caret = Math.min(start + pasted.length, next.length)

    setDraft(next)

    queueMicrotask(() => {
      if (document.activeElement === input) {
        input.setSelectionRange(caret, caret)
      }
    })
  }

  return (
    <div className="chat-widget__session">
      <div
        className="chat-widget__messages"
        ref={listRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {showIntro && (
          <div className="chat-widget__intro">
            <ChatMessage role="assistant" text={GREETING} />

            <div className="chat-widget__suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  className="chat-widget__suggestion"
                  key={suggestion}
                  type="button"
                  onClick={() => onSend(suggestion)}
                  disabled={composerDisabled}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage
            key={`${message.role}-${index}`}
            failed={message.status === 'failed'}
            onRetry={
              index === lastMessageIndex &&
              message.status === 'failed' &&
              !composerDisabled
                ? () => onSend(message.text)
                : undefined
            }
            role={message.role}
            text={message.text}
          />
        ))}

        {isSending && (
          <ChatMessage role="assistant">
            <ChatThinkingIndicator />
          </ChatMessage>
        )}
      </div>

      {error?.message && (
        <p className="chat-widget__status chat-widget__status--alert" role="alert">
          {error.message}
        </p>
      )}

      <form className="chat-widget__composer" onSubmit={handleSubmit}>
        <textarea
          className="chat-widget__input"
          ref={inputRef}
          rows={1}
          value={draft}
          onChange={handleDraftChange}
          onPaste={handlePaste}
          onKeyDown={handleComposerKeyDown}
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={composerDisabled}
          placeholder="Ask about Gabriel…"
          aria-label="Message"
          aria-describedby="chat-message-counter"
          autoComplete="off"
          enterKeyHint="send"
        />

        <div className="chat-widget__composer-footer">
          <span
            className={
              atLimit
                ? 'chat-widget__counter chat-widget__counter--limit'
                : nearLimit
                  ? 'chat-widget__counter chat-widget__counter--warn'
                  : 'chat-widget__counter'
            }
            id="chat-message-counter"
            aria-live="polite"
          >
            {characterCount} / {MAX_MESSAGE_LENGTH}
          </span>

          <button
            className="chat-widget__send"
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 19V5M6 11l6-6 6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatPanel
