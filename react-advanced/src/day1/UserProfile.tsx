import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
}

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(setUser)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err)
      })

    return () => controller.abort()
  }, [userId])

  if (error) return <p>Error: {error.message}</p>
  if (!user) return <p>Loading…</p>

  return (
    <h2>
      {userId} - {user.name}
    </h2>
  )
}
