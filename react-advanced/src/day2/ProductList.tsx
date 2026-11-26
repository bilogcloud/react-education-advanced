import { useQuery } from '@tanstack/react-query'

import { api } from '@/day2/api.ts'
import type { Product } from '@/day2/types.ts'

export function ProductList({ search }: { search: string }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products', search], // the cache key: changes → new query
    queryFn: () =>
      api<Product[]>(`/products?name_like=${encodeURIComponent(search)}`),
  })

  if (isPending) return <p>Loading…</p>
  if (isError) return <p role="alert">Error: {error.message}</p>

  return (
    <>
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            {p.name} — €{p.price}
          </li>
        ))}
      </ul>
    </>
  )
}
