import { useCart, useCartDispatch } from '@/day2/CartContext.tsx'
import type { Product } from '@/day2/types.ts'

export function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useCartDispatch()
  return (
    <button onClick={() => dispatch({ type: 'added', item: product })}>
      Add to cart
    </button>
  )
}

export function CartBadge() {
  const cart = useCart()
  const count = cart.items.reduce((n, i) => n + i.quantity, 0)
  return <span className="badge">{count}</span>
}
