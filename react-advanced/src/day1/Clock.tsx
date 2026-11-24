import { useEffect, useState } from 'react'

export function Clock() {
  const [, setTick] = useState(0)

  // Runs during render: on every call of the function
  console.log('render')

  // Runs after commit: React has updated the DOM
  useEffect(() => {
    console.log('committed')
  })

  return (
    <div>
      <p>This text never changes</p>
      <button onClick={() => setTick((t) => t + 1)}>Re-render</button>
    </div>
  )
}
