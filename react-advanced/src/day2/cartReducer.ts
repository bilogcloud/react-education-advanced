export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}
export type CartState = { items: CartItem[]; coupon: string | null }

export type CartAction =
  | { type: 'added'; item: Omit<CartItem, 'quantity'> }
  | { type: 'removed'; id: string }
  | { type: 'quantityChanged'; id: string; quantity: number }
  | { type: 'couponApplied'; code: string }
  | { type: 'cleared' }

export const initialCart: CartState = {
  items: [{ id: 'p1', name: 'Mug', price: 12, quantity: 1 }],
  coupon: null,
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'added': {
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      }
    }
    case 'removed':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'quantityChanged':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.id),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i,
        ),
      }
    case 'couponApplied':
      return { ...state, coupon: action.code }
    case 'cleared':
      return initialCart
  }
}
