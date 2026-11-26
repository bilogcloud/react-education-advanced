import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  function addThree() {
    // setCount((previousCount) => previousCount + 1)
    // setCount((previousCount) => previousCount + 1)
    // setCount((previousCount) => previousCount + 1)
    setCount(count + 5)
    setCount(count + 2)
    setCount((c) => c + 1)
    console.log(count)
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={addThree}>Add</button>
    </>
  )
}
