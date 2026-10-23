const GIS_SRC = 'https://accounts.google.com/gsi/client'

export function loadGoogleIdentityScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve()
  }

  const existing = document.querySelector(`script[src="${GIS_SRC}"]`)

  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        resolve()
        return
      }

      existing.addEventListener(
        'load',
        () => {
          if (window.google?.accounts?.id) {
            resolve()
            return
          }

          reject(new Error('Failed to load Google Identity Services'))
        },
        { once: true }
      )

      existing.addEventListener(
        'error',
        () => {
          reject(new Error('Failed to load Google Identity Services'))
        },
        { once: true }
      )
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GIS_SRC
    script.async = true
    script.defer = true

    script.onload = () => {
      if (window.google?.accounts?.id) {
        resolve()
        return
      }

      reject(new Error('Failed to load Google Identity Services'))
    }

    script.onerror = () => {
      reject(new Error('Failed to load Google Identity Services'))
    }

    document.head.appendChild(script)
  })
}
