// ProductSearch.tsx — complete and runnable on its own
import { memo, useDeferredValue, useState } from 'react'

type Product = { id: string; name: string; price: number }

// 1,000 generated products: enough to make typing lag without useDeferredValue
const products: Product[] = Array.from({ length: 1000 }, (_, i) => ({
  id: String(i),
  name: `Product ${i}`,
  price: (i * 7) % 100,
}))

export default function ProductSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query) // lags behind while rendering is busy
  const isStale = query !== deferredQuery

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search, e.g. 12"
      />
      <div style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        <SearchResults query={deferredQuery} products={products} />
      </div>
    </>
  )
}

// memo is required (or the React Compiler): otherwise the results
// re-render with every keystroke anyway, because their parent re-renders
const SearchResults = memo(function SearchResults({
  query,
  products,
}: {
  query: string
  products: Product[]
}) {
  const matches = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <>
      <p>{matches.length} results</p>
      <ul>
        {matches.map((p) => (
          <SlowItemRow key={p.id} product={p} />
        ))}
      </ul>
    </>
  )
})

function SlowItemRow({ product }: { product: Product }) {
  const start = performance.now()
  while (performance.now() - start < 0.5) {} // simulated work
  return (
    <li>
      {product.name} — €{product.price}
    </li>
  )
}
