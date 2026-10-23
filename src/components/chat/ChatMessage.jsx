import ChatMarkdown from './ChatMarkdown'
import '../../styles/components/chat/chat-message.css'

function ChatMessage({
  failed = false,
  onRetry,
  role = 'assistant',
  text = '',
  children,
}) {
  const isAssistant = role === 'assistant'

  return (
    <article className={`chat-message chat-message--${role}`}>
      <div className="chat-message__content">
        <div className="chat-message__bubble">
          {children ?? (
            isAssistant ? (
              <ChatMarkdown text={text} />
            ) : (
              <p className="chat-message__text">{text}</p>
            )
          )}
        </div>

        {failed && (
          <p className="chat-message__status">Couldn't get a response</p>
        )}

        {failed && onRetry && (
          <button
            className="chat-message__retry"
            type="button"
            onClick={onRetry}
          >
            Try again
          </button>
        )}
      </div>
    </article>
  )
}

export default ChatMessage
