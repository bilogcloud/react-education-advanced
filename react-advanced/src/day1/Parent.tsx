import { useEffect, useState } from 'react'

export function Parent() {
  const [count, setCount] = useState(0)
  console.log('Parent render')

  useEffect(() => {
    console.log('Parent effect')
  }, [])

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <Child />
    </>
  )
}

function Child() {
  console.log('Child render')

  useEffect(() => {
    console.log('Child effect')
  }, [])

  return <p>I have no props</p>
}
