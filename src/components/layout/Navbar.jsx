import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import '../../styles/components/layout/navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightTheme, setLightTheme] = useState(false)
  const navbarRef = useRef(null)
  const { pathname } = useLocation()

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

  function handleAboutClick() {
    closeMenu()

    if (pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  function handleContactClick() {
    closeMenu()

    if (pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <header
      className={`navbar ${lightTheme ? 'navbar--light' : 'navbar--dark'}`}
      ref={navbarRef}
    >
      <div className="content-container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={handleAboutClick}>
          Gabriel
        </Link>

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
            <Link to="/" onClick={handleAboutClick}>
              About
            </Link>

            <Link to="/projects" onClick={closeMenu}>
              Projects
            </Link>

            <Link to="/experience" onClick={closeMenu}>
              Experience
            </Link>

            <Link to="/education" onClick={closeMenu}>
              Education
            </Link>

            <Link to="/#contact" onClick={handleContactClick}>
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar