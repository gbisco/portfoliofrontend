import Markdown from 'react-markdown'

const ALLOWED_ELEMENTS = ['p', 'strong', 'em', 'ul', 'ol', 'li', 'code', 'a']

function isSafeHref(href) {
  if (typeof href !== 'string' || !href.trim()) {
    return false
  }

  try {
    const url = new URL(href, window.location.origin)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function ChatMarkdown({ text }) {
  if (typeof text !== 'string' || !text) {
    return null
  }

  return (
    <Markdown
      allowedElements={ALLOWED_ELEMENTS}
      unwrapDisallowed
      urlTransform={(href) => (isSafeHref(href) ? href : '')}
      components={{
        a({ href, children }) {
          if (!isSafeHref(href)) {
            return <span>{children}</span>
          }

          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          )
        },
      }}
    >
      {text}
    </Markdown>
  )
}

export default ChatMarkdown
