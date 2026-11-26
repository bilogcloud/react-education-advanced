import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from 'react'

// ❌ WRONG: one context for the value AND the setter
const CartContext = createContext({ count: 0, add: () => {} })

function WrongProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const add = () => setCount((c) => c + 1)
  return <CartContext value={{ count, add }}>{children}</CartContext>
}

function WrongBadge() {
  const { count } = useContext(CartContext)
  console.log('❌ Badge rendered')
  return <p>Items: {count}</p>
}

function WrongButton() {
  const { add } = useContext(CartContext) // only needs add, still re-renders
  console.log('❌ Button rendered')
  return <button onClick={add}>Add</button>
}

// ✅ RIGHT: value and setter in separate contexts
const CountContext = createContext(0)
const SetCountContext = createContext<Dispatch<SetStateAction<number>>>(
  () => {},
)

function RightProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  return (
    <CountContext value={count}>
      <SetCountContext value={setCount}>{children}</SetCountContext>
    </CountContext>
  )
}

function RightBadge() {
  const count = useContext(CountContext)
  console.log('✅ Badge rendered')
  return <p>Items: {count}</p>
}

function RightButton() {
  const setCount = useContext(SetCountContext) // setCount never changes
  console.log('✅ Button rendered')
  return <button onClick={() => setCount((c) => c + 1)}>Add</button>
}

export default function ContextDemo() {
  return (
    <>
      <h2>❌ One context</h2>
      <WrongProvider>
        <WrongBadge />
        <WrongButton />
      </WrongProvider>

      <h2>✅ Split contexts</h2>
      <RightProvider>
        <RightBadge />
        <RightButton />
      </RightProvider>
    </>
  )
}
