import { useLayoutEffect, useRef } from 'react'
import { useGoogleAuth } from '../../auth/GoogleAuthContext'

function GoogleSignInButton() {
  const containerRef = useRef(null)
  const { renderButton } = useGoogleAuth()

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    renderButton(containerRef.current)

    const frame = window.requestAnimationFrame(() => {
      if (containerRef.current) {
        renderButton(containerRef.current)
      }
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [renderButton])

  return (
    <div
      className="chat-widget__google-button"
      ref={containerRef}
    />
  )
}

export default GoogleSignInButton
