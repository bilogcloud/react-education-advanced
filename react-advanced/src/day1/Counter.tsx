import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  function addThree() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    console.log(count)
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={addThree}>+3</button>
    </>
  )
}
