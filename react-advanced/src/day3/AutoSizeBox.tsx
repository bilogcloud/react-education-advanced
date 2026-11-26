import { useState } from 'react'

export function AutoSizeBox() {
  const [width, setWidth] = useState(0)
  return (
    <div
      ref={(el) => {
        if (!el) return
        const observer = new ResizeObserver(([entry]) =>
          setWidth(entry.contentRect.width),
        )
        observer.observe(el)
        return () => observer.disconnect() // runs when the element is removed
      }}
    >
      I am {Math.round(width)}px wide
    </div>
  )
}
