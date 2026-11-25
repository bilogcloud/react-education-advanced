import { useEffect, useState } from 'react'

export function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount((count) => count + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return <p>{count}</p>
}
