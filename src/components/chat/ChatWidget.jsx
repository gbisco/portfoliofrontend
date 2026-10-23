import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import ChatAuthView from './ChatAuthView'
import '../../styles/components/chat/chat-widget.css'

function isGoogleIdentityEvent(event) {
  const path = typeof event.composedPath === 'function' ? event.composedPath() : []

  return path.some((node) => {
    if (!(node instanceof Element)) {
      return false
    }

    const id = node.id || ''
    const src = node.getAttribute('src') || ''

    return (
      id === 'credential_picker_container' ||
      id.startsWith('gsi_') ||
      src.includes('accounts.google.com')
    )
  })
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const widgetRef = useRef(null)
  const panelRef = useRef(null)
  const launcherRef = useRef(null)
  const closeButtonRef = useRef(null)
  const titleId = useId()
  const subtitleId = useId()
  const panelId = useId()

  function openPanel() {
    setIsOpen(true)
  }

  function closePanel() {
    setIsOpen(false)
  }

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined
    }

    closeButtonRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handlePointerDown(event) {
      if (isGoogleIdentityEvent(event)) {
        return
      }

      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        closePanel()
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePanel()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')

      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !panelRef.current.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)

      const active = document.activeElement
      if (panelRef.current?.contains(active)) {
        launcherRef.current?.focus()
      }
    }
  }, [isOpen])

  return (
    <div className="chat-widget" ref={widgetRef}>
      <div
        className={`chat-widget__panel ${isOpen ? 'chat-widget__panel--open' : ''}`}
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitleId}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <div className="chat-widget__header">
          <div className="chat-widget__heading">
            <h2 className="chat-widget__title" id={titleId}>
              Gabriel's AI
            </h2>
            <p className="chat-widget__subtitle" id={subtitleId}>
              Portfolio assistant
            </p>
          </div>

          <button
            className="chat-widget__close"
            type="button"
            ref={closeButtonRef}
            onClick={closePanel}
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m7 7 10 10M17 7 7 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ChatAuthView isOpen={isOpen} />
      </div>

      <button
        className="chat-widget__launcher"
        type="button"
        ref={launcherRef}
        onClick={isOpen ? closePanel : openPanel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="chat-widget__launcher-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5.5 5.75A2.75 2.75 0 0 1 8.25 3h7.5A2.75 2.75 0 0 1 18.5 5.75v6.5A2.75 2.75 0 0 1 15.75 15H9.2L5.5 18.2V5.75Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9 8.25h6M9 11.25h3.75"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        Ask my AI
      </button>
    </div>
  )
}

export default ChatWidget
