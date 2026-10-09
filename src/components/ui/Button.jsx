import '../../styles/components/ui/button.css'

function Button({
  children,
  tone = 'primary',
  surface = 'solid',
  blur = true,
  href,
  onClick,
  type = 'button',
}) {
  const className = [
    'button',
    `button--${tone}`,
    `button--${surface}`,
    surface === 'glass' && blur ? 'button--blur' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button