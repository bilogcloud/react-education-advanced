import type { Product } from '@/day2/types.ts'
import { useSearchParams } from 'react-router'

export function ProductList({ products }: { products: Product[] }) {
  const [searchParams] = useSearchParams()
  const search = (searchParams.get('q') ?? '').toLowerCase()
  const sort = searchParams.get('sort') ?? 'price'

  const visible = products
    .filter((p) => p.name.toLowerCase().includes(search))
    .sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name) : a.price - b.price,
    )

  return (
    <ul>
      {visible.map((p) => (
        <li key={p.id}>
          {p.name} — €{p.price}
        </li>
      ))}
    </ul>
  )
}
