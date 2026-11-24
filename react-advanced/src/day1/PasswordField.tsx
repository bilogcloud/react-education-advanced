import { useId } from 'react'

export function PasswordField() {
  const id = useId()
  return (
    <form>
      <label htmlFor={id}>Password</label>
      <input
        id={id}
        type="password"
        autoComplete="current-password"
        aria-describedby={`${id}-hint`}
      />
      <p id={`${id}-hint`}>At least 12 characters</p>
    </form>
  )
}
