import { useEffect, useState } from 'react'

type Product = {
  id: string
  name: string
}

export function ProductSearch({ category }: { category: string }) {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [count, setCount] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then((r) => r.json())
      .then(setProducts)
  }, [category])

  useEffect(() => {
    setFiltered(
      products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    )
  }, [products, query])

  useEffect(() => {
    setCount(filtered.length)
  }, [filtered])

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setQuery('')
    })
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSeconds(seconds + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>
        {count} results · on page for {seconds}s
      </p>
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}
