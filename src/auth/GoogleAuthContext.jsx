import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { loadGoogleIdentityScript } from './loadGoogleIdentity'
import { parseJwtPayload } from './parseJwtPayload'

const GoogleAuthContext = createContext(null)

function toUnverifiedProfile(payload) {
  return {
    name: typeof payload.name === 'string' ? payload.name : '',
    givenName: typeof payload.given_name === 'string' ? payload.given_name : '',
    email: typeof payload.email === 'string' ? payload.email : '',
    picture: typeof payload.picture === 'string' ? payload.picture : '',
    subject: typeof payload.sub === 'string' ? payload.sub : '',
    expiresAt: Number(payload.exp) * 1000,
  }
}

export function GoogleAuthProvider({ children }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const [status, setStatus] = useState(clientId ? 'loading' : 'unavailable')
  const [errorMessage, setErrorMessage] = useState(
    clientId ? null : 'Google Sign-In is not configured.'
  )
  const [idToken, setIdToken] = useState(null)
  const [profile, setProfile] = useState(null)
  const expiryTimerRef = useRef(null)
  const credentialHandlerRef = useRef(() => {})

  const clearExpiryTimer = useCallback(() => {
    if (expiryTimerRef.current !== null) {
      window.clearTimeout(expiryTimerRef.current)
      expiryTimerRef.current = null
    }
  }, [])

  const clearSession = useCallback(() => {
    clearExpiryTimer()
    setIdToken(null)
    setProfile(null)
  }, [clearExpiryTimer])

  const handleCredential = useCallback((credential) => {
    const payload = parseJwtPayload(credential)

    if (!payload) {
      setErrorMessage('Sign-in failed. Please try again.')
      return
    }

    const unverifiedProfile = toUnverifiedProfile(payload)
    const remainingMs = unverifiedProfile.expiresAt - Date.now()

    if (!Number.isFinite(remainingMs) || remainingMs <= 0) {
      setErrorMessage('Your session expired. Please sign in again.')
      return
    }

    setIdToken(credential)
    setProfile(unverifiedProfile)
    setStatus('signed-in')
    setErrorMessage(null)

    clearExpiryTimer()
    expiryTimerRef.current = window.setTimeout(() => {
      clearSession()
      setStatus('ready')
      setErrorMessage('Your session expired. Please sign in again.')
    }, remainingMs)
  }, [clearExpiryTimer, clearSession])

  useEffect(() => {
    credentialHandlerRef.current = handleCredential
  }, [handleCredential])

  useEffect(() => {
    let cancelled = false

    async function initializeGoogleIdentity() {
      if (!clientId) {
        setStatus('unavailable')
        setErrorMessage('Google Sign-In is not configured.')
        return
      }

      try {
        await loadGoogleIdentityScript()

        if (cancelled) {
          return
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (!response?.credential) {
              setErrorMessage('Sign-in failed. Please try again.')
              return
            }

            credentialHandlerRef.current(response.credential)
          },
          auto_select: false,
        })

        if (!cancelled) {
          setStatus((current) => (current === 'signed-in' ? current : 'ready'))
        }
      } catch {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage('Google Sign-In could not be loaded.')
        }
      }
    }

    initializeGoogleIdentity()

    return () => {
      cancelled = true
    }
  }, [clientId])

  useEffect(() => {
    return () => {
      clearExpiryTimer()
    }
  }, [clearExpiryTimer])

  const signOut = useCallback((options = {}) => {
    const nextMessage =
      typeof options.message === 'string' && options.message.trim()
        ? options.message.trim()
        : null

    clearSession()
    setErrorMessage(nextMessage)
    setStatus(clientId && window.google?.accounts?.id ? 'ready' : 'unavailable')

    try {
      window.google?.accounts?.id?.disableAutoSelect()
    } catch {
      // Google's SDK may be unavailable after a load failure.
    }
  }, [clearSession, clientId])

  const renderButton = useCallback((element) => {
    if (!element || !window.google?.accounts?.id) {
      return
    }

    element.replaceChildren()

    const width = Math.min(
      400,
      Math.max(240, Math.floor(element.getBoundingClientRect().width) || 320)
    )

    window.google.accounts.id.renderButton(element, {
      type: 'standard',
      theme: 'filled_black',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
      width,
    })
  }, [])

  const value = useMemo(() => ({
    status,
    errorMessage,
    isSignedIn: status === 'signed-in',
    profile,
    idToken,
    signOut,
    renderButton,
  }), [errorMessage, idToken, profile, renderButton, signOut, status])

  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext)

  if (!context) {
    throw new Error('useGoogleAuth must be used within GoogleAuthProvider')
  }

  return context
}
