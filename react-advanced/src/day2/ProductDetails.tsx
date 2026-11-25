import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { productKeys } from '@/day2/productKeys.ts'
import { api } from '@/day2/api.ts'
import type { Product } from '@/day2/types.ts'

export function ProductDetails({ id }: { id: string }) {
  const { data: product } = useSuspenseQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => api<Product>(`/products/${id}`),
  });
  // no isPending or isError branches: data is always a Product here
  return (
    <article>
      <h2>{product.name}</h2>
      <p>€{product.price}</p>
    </article>
  );
}

export function ProductPage({ id }: { id: string }) {
  return (
    <Suspense fallback={<p>Loading product…</p>}>
      <ProductDetails id={id} />
    </Suspense>
  );
}