import '../../styles/components/ui/button.css'

function Button({
  children,
  tone = 'primary',
  surface = 'solid',
  blur = true,
  href,
  onClick,
  type = 'button',
  disabled = false,
  ...rest
}) {
  const className = [
    'button',
    `button--${tone}`,
    `button--${surface}`,
    surface === 'glass' && blur ? 'button--blur' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (href && !disabled) {
    return (
      <a className={className} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button