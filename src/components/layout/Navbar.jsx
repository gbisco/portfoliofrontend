import { useEffect, useRef, useState } from 'react'
import '../../styles/components/layout/navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightTheme, setLightTheme] = useState(false)
  const navbarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  useEffect(() => {
    function updateNavbarTheme() {
      const navbar = navbarRef.current

      if (!navbar) {
        return
      }

      const navbarRect = navbar.getBoundingClientRect()
      const sampleX = window.innerWidth / 2
      const sampleY = navbarRect.bottom + 1

      const elements = document.elementsFromPoint(sampleX, sampleY)

      const lightSection = elements.find((element) =>
        element.closest('[data-navbar-theme="light"]')
      )

      setLightTheme(Boolean(lightSection))
    }

    updateNavbarTheme()

    window.addEventListener('scroll', updateNavbarTheme, { passive: true })
    window.addEventListener('resize', updateNavbarTheme)

    return () => {
      window.removeEventListener('scroll', updateNavbarTheme)
      window.removeEventListener('resize', updateNavbarTheme)
    }
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header
      className={`navbar ${lightTheme ? 'navbar--light' : 'navbar--dark'}`}
      ref={navbarRef}
    >
      <div className="content-container navbar__inner">
        <a href="/" className="navbar__brand" onClick={closeMenu}>
          Gabriel
        </a>

        <button
          className="navbar__menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '×' : '☰'}
        </button>

        {menuOpen && (
          <nav className="navbar__menu">
            <a href="/#about" onClick={closeMenu}>
              About
            </a>

            <a href="/projects" onClick={closeMenu}>
              Projects
            </a>

            <a href="/#experience" onClick={closeMenu}>
              Experience
            </a>

            <a href="/#education" onClick={closeMenu}>
              Education
            </a>

            <a href="/#contact" onClick={closeMenu}>
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar