import { useRef, useState } from 'react'

export function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<number | null>(null) // mutable value
  const buttonRef = useRef<HTMLButtonElement>(null) // DOM element

  function start() {
    if (intervalRef.current !== null) return
    intervalRef.current = window.setInterval(
      () => setElapsed((e) => e + 1),
      1000,
    )
  }

  function stop() {
    if (intervalRef.current !== null) clearInterval(intervalRef.current)
    intervalRef.current = null
    buttonRef.current?.focus()
  }

  return (
    <>
      <p>{elapsed}s</p>
      <br />
      <button ref={buttonRef} onClick={start}>
        Start
      </button>
      <br />
      <button onClick={stop}>Stop</button>
    </>
  )
}
