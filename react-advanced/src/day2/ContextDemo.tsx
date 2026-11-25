import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'

type Action = { type: 'add' } | { type: 'reset' }

function reducer(count: number, action: Action): number {
  switch (action.type) {
    case 'add':
      return count + 1
    case 'reset':
      return 0
  }
}

// Flashes the element and logs after every render that commits
function useRenderFlash<T extends HTMLElement>(name: string) {
  const ref = useRef<T>(null)
  useEffect(() => {
    console.log(`${name} rendered`)
    ref.current?.animate(
      [{ backgroundColor: '#fde68a' }, { backgroundColor: 'transparent' }],
      { duration: 800 },
    )
  })
  return ref
}

// ---------- WRONG: one context holds both state and dispatch ----------

const CartContext = createContext<{
  count: number
  dispatch: Dispatch<Action>
} | null>(null)

function WrongProvider({ children }: { children: ReactNode }) {
  const [count, dispatch] = useReducer(reducer, 0)
  return <CartContext value={{ count, dispatch }}>{children}</CartContext>
}

function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <WrongProvider>')
  return ctx
}

function WrongBadge() {
  const ref = useRenderFlash<HTMLParagraphElement>('❌ Badge')
  const { count } = useCart() // needs count: re-rendering is correct
  return <p ref={ref}>Items in cart: {count}</p>
}

function WrongButton({ label }: { label: string }) {
  const ref = useRenderFlash<HTMLButtonElement>(`❌ Button ${label}`)
  const { dispatch } = useCart() // only needs dispatch, but reads the whole context
  return (
    <button ref={ref} onClick={() => dispatch({ type: 'add' })}>
      Add {label}
    </button>
  )
}

// ---------- CORRECT: state and dispatch in separate contexts ----------

const CountContext = createContext<number | null>(null)
const DispatchContext = createContext<Dispatch<Action> | null>(null)

function RightProvider({ children }: { children: ReactNode }) {
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <CountContext value={count}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </CountContext>
  )
}

function useCount() {
  const ctx = useContext(CountContext)
  if (ctx === null)
    throw new Error('useCount must be used inside <RightProvider>')
  return ctx
}

function useCartDispatch() {
  const ctx = useContext(DispatchContext)
  if (!ctx)
    throw new Error('useCartDispatch must be used inside <RightProvider>')
  return ctx
}

function RightBadge() {
  const ref = useRenderFlash<HTMLParagraphElement>('✅ Badge')
  const count = useCount()
  return <p ref={ref}>Items in cart: {count}</p>
}

function RightButton({ label }: { label: string }) {
  const ref = useRenderFlash<HTMLButtonElement>(`✅ Button ${label}`)
  const dispatch = useCartDispatch() // dispatch never changes → no re-render
  return (
    <button ref={ref} onClick={() => dispatch({ type: 'add' })}>
      Add {label}
    </button>
  )
}

// ---------- Both versions side by side ----------
// The children are created here, in a component that never re-renders,
// so the ONLY reason anything below re-renders is the context.

export default function ContextDemo() {
  return (
    <div style={{ display: 'flex', gap: 48 }}>
      <section>
        <h2>❌ One context</h2>
        <WrongProvider>
          <WrongBadge />
          <WrongButton label="A" />
          <WrongButton label="B" />
          <WrongButton label="C" />
        </WrongProvider>
      </section>
      <section>
        <h2>✅ Split contexts</h2>
        <RightProvider>
          <RightBadge />
          <RightButton label="A" />
          <RightButton label="B" />
          <RightButton label="C" />
        </RightProvider>
      </section>
    </div>
  )
}
