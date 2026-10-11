import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        const targetId = decodeURIComponent(location.hash.slice(1))
        const target = document.getElementById(targetId)

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
          return
        }
      }

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return null
}

export default ScrollManager