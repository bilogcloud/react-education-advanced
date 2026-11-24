// oxlint-disable react-hooks/exhaustive-deps

import { useEffect, useState } from 'react'

export function Timer() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000)
    return () => clearInterval(id)
  }, [])
  return <p>{count}</p>
}
