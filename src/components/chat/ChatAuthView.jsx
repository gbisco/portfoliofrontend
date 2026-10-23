import Button from '../ui/Button'
import { useGoogleAuth } from '../../auth/GoogleAuthContext'
import GoogleSignInButton from './GoogleSignInButton'

function ChatAuthView({ isOpen = false }) {
  const {
    errorMessage,
    isSignedIn,
    profile,
    signOut,
    status,
  } = useGoogleAuth()

  if (isSignedIn) {
    const displayName = profile?.givenName || profile?.name

    return (
      <>
        <p className="chat-widget__welcome">
          Welcome{displayName ? `, ${displayName}` : ''}. You are signed in
          to the portfolio assistant. Chat will be available in a later update.
        </p>

        <Button
          tone="secondary"
          surface="glass"
          onClick={signOut}
        >
          Sign out
        </Button>
      </>
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
        <p className="chat-widget__status" role="alert">
          {errorMessage}
        </p>
      )}
    </>
  )
}

export default ChatAuthView
