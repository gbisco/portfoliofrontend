import { useState } from 'react'
import '../../styles/components/layout/navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="content-container navbar__inner">
        <a href="/" className="navbar__brand">
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
            <a href="/#about">About</a>
            <a href="/projects">Projects</a>
            <a href="/#experience">Experience</a>
            <a href="/#education">Education</a>
            <a href="/#contact">Contact</a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar