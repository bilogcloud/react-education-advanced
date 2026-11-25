import { useLayoutEffect, useRef, useState } from 'react'

export function HelpButton() {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const show = (e: React.SyntheticEvent<HTMLButtonElement>) =>
    setTargetRect(e.currentTarget.getBoundingClientRect())
  const hide = () => setTargetRect(null)

  return (
    <>
      <button
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show} // keyboard users get the tooltip too
        onBlur={hide}
      >
        ?
      </button>

      {targetRect && (
        <Tooltip
          targetRect={targetRect}
          text="Your password must be 12+ characters"
        />
      )}
    </>
  )
}

function Tooltip({ targetRect, text }: { targetRect: DOMRect; text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  // triggers before UI paints
  useLayoutEffect(() => {
    setHeight(ref.current!.getBoundingClientRect().height)
  }, [text])

  // Show above the target, or below it if there is no room above
  const top =
    targetRect.top - height < 0 ? targetRect.bottom : targetRect.top - height

  return (
    <div
      ref={ref}
      style={{ position: 'fixed', top, left: targetRect.left, color: 'red' }}
    >
      {text}
    </div>
  )
}
