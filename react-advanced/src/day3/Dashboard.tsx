import { useState } from 'react'

export function Dashboard() {
  const [crash, setCrash] = useState(false)

  if (crash) {
    throw new Error('Crash in Dashboard')
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => setCrash(true)}>Simulate crash</button>

      <br />
      <br />
      <br />
      <button
        onClick={() => {
          throw new Error('Crash in onClick')
        }}
      >
        Trigger unhandled crash
      </button>
    </>
  )
}
