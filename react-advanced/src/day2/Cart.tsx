// Cart.tsx
import { useReducer } from 'react'

import { cartReducer, initialCart } from '@/day2/cartReducer.ts'

export function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0) // derived

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: 'added',
            item: { id: 'p1', name: 'Mug', price: 12 },
          })
        }
      >
        Add mug
      </button>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} ×
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                dispatch({
                  type: 'quantityChanged',
                  id: item.id,
                  quantity: Number(e.target.value),
                })
              }
            />
          </li>
        ))}
      </ul>
      <p>Total: €{total}</p>
    </>
  )
}
