// cartReducer.test.ts
import { describe, expect, test } from 'vitest'

import { cartReducer, initialCart } from '@/day2/cartReducer.ts'

const mug = { id: 'p1', name: 'Mug', price: 12 }

describe('cartReducer', () => {
  test('adds a new item with quantity 1', () => {
    const state = cartReducer(initialCart, { type: 'added', item: mug })
    expect(state.items).toEqual([{ ...mug, quantity: 1 }])
  })

  test('increases the quantity when the item is already in the cart', () => {
    const once = cartReducer(initialCart, { type: 'added', item: mug })
    const twice = cartReducer(once, { type: 'added', item: mug })
    expect(twice.items[0].quantity).toBe(2)
  })

  test('removes the item when its quantity is set to 0', () => {
    const state = cartReducer(
      { items: [{ ...mug, quantity: 3 }], coupon: null },
      { type: 'quantityChanged', id: 'p1', quantity: 0 },
    )
    expect(state.items).toEqual([])
  })

  test('never changes the previous state', () => {
    const before = { items: [{ ...mug, quantity: 1 }], coupon: null }
    cartReducer(before, { type: 'added', item: mug })
    expect(before.items[0].quantity).toBe(1) // still 1: the reducer made a copy
  })
})
