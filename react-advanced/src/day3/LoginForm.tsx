import { useState } from 'react'

export function LoginForm({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!email.includes('@')) return setError('Enter a valid email')
        onSubmit(email)
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p role="alert">{error}</p>}
      <button>Log in</button>
    </form>
  )
}
