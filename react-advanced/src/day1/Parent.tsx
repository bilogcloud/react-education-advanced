import { useEffect, useState } from 'react'

export function Parent() {
  console.log('Parent render')

  useEffect(() => {
    console.log('Parent effect')
  }, [])

  return (
    <>
      <Counter />
      <Child />
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  console.log('Counter render')

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>
}

function Child() {
  console.log('Child render')

  useEffect(() => {
    console.log('Child effect')
  }, [])

  return <p>I have no props</p>
}
