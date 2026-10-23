function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = (4 - (base64.length % 4)) % 4
  const padded = base64.padEnd(base64.length + padding, '=')
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

export function parseJwtPayload(token) {
  if (typeof token !== 'string') {
    return null
  }

  const parts = token.split('.')

  if (parts.length !== 3) {
    return null
  }

  try {
    return JSON.parse(decodeBase64Url(parts[1]))
  } catch {
    return null
  }
}
