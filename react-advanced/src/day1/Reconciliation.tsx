import { useState } from 'react'

export function Reconciliation() {
  const [isFancy, setIsFancy] = useState(false)

  return (
    <>
      <button onClick={() => setIsFancy(!isFancy)}>Toggle fancy</button>
      <br />
      <br />
      {isFancy ? <Counter color="gold" /> : <Counter color="gray" />}

      <br />

      {isFancy ? (
        <div>
          <Counter />
        </div>
      ) : (
        <section>
          <Counter />
        </section>
      )}
    </>
  )
}

function Counter({ color }: { color?: 'gold' | 'gray' }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Counter {color}</p>
      <p>Count {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}

export function Form() {
  const [text, setText] = useState('')

  // BUG: a new Input type is created on every render,
  // so React unmounts and remounts it and the input loses focus on each keystroke
  function Input() {
    return <input value={text} onChange={(e) => setText(e.target.value)} />
  }

  return <Input />
}
