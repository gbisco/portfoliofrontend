import { useEffect, useId, useRef, useState } from 'react'
import '../../styles/components/ui/dropdown.css'

function Dropdown({
  options = [],
  value,
  onChange,
  label,
  placeholder = 'Select an option',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const menuId = useId()

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  function handleSelect(option) {
    onChange?.(option.value)
    setIsOpen(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      {label && (
        <span className="dropdown__label">
          {label}
        </span>
      )}

      <button
        className={`dropdown__trigger ${isOpen ? 'dropdown__trigger--open' : ''}`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{selectedOption?.label || placeholder}</span>

        <span className={`dropdown__chevron ${isOpen ? 'dropdown__chevron--open' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="dropdown__menu" id={menuId} role="listbox" aria-label={label || placeholder}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`dropdown__option ${option.value === value ? 'dropdown__option--selected' : ''}`}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option)}
            >
              <span className="dropdown__check" aria-hidden="true">
                {option.value === value ? '✓' : ''}
              </span>

              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown