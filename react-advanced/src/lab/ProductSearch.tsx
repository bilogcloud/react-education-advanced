import { useEffect, useState } from 'react'

type Product = {
  id: string
  title: string
  body: string
}

export function ProductSearch({ category }: { category: string }) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const [products, setProducts] = useState<Product[]>([])
  // const [filtered, setFiltered] = useState<Product[]>([])
  // const [count, setCount] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // race condition when category changes quickly
  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://jsonplaceholder.typicode.com/posts?category=${category}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then(setProducts)
      .catch((e) => {
        if (e !== 'AbortError') setError(e)
      })

    return () => controller.abort()
  }, [category])

  // useState instead of simple derived state
  // useEffect(() => {
  //   setFiltered(
  //     products.filter((p) =>
  //       p.title.toLowerCase().includes(query.toLowerCase()),
  //     ),
  //   )
  // }, [products, query])

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  )

  // again useState instead of simple derived state
  // useEffect(() => {
  //   setCount(filtered.length)
  // }, [filtered])

  const count = filtered.length

  // missing cleanup - StrictMode exposes this bug
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setQuery('')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  // stale closure bug
  useEffect(() => {
    const id = setInterval(() => setSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      {error && <p>{error}</p>}
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>
        {count} results · on page for {seconds}s
      </p>
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}
