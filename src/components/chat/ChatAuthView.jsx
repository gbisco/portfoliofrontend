import ChatPanel from './ChatPanel'
import GoogleSignInButton from './GoogleSignInButton'

function ChatAuthView({
  error,
  errorMessage,
  isOpen = false,
  isSending,
  isSignedIn,
  messages,
  onSend,
  status,
}) {
  if (isSignedIn) {
    return (
      <ChatPanel
        error={error}
        isSending={isSending}
        messages={messages}
        onSend={onSend}
      />
    )
  }

  return (
    <>
      <p className="chat-widget__welcome">
        Ask about my projects, experience, and skills. I can help you
        explore the work on this portfolio.
      </p>

      {status === 'loading' && (
        <p className="chat-widget__status">
          Loading Google Sign-In…
        </p>
      )}

      {status === 'ready' && isOpen && <GoogleSignInButton />}

      {errorMessage && (
        <p className="chat-widget__status chat-widget__status--alert" role="alert">
          {errorMessage}
        </p>
      )}
    </>
  )
}

export default ChatAuthView
