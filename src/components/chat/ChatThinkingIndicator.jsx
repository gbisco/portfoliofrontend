import '../../styles/components/chat/chat-thinking.css'

function ChatThinkingIndicator() {
  return (
    <div className="chat-thinking" role="status" aria-live="polite">
      <span className="chat-thinking__label">
        Assistant is thinking.
      </span>

      <span className="chat-thinking__dots" aria-hidden="true">
        <span className="chat-thinking__dot" />
        <span className="chat-thinking__dot" />
        <span className="chat-thinking__dot" />
      </span>
    </div>
  )
}

export default ChatThinkingIndicator
