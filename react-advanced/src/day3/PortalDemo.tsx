import { type CSSProperties, type ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'

const cardStyle: CSSProperties = {
  width: 260,
  height: 160,
  padding: 16,
  border: '1px solid #ddd',
  borderRadius: 12,
  overflow: 'hidden',
  transform: 'translateZ(0)',
}

function Dialog({
  onClose,
  children,
}: {
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgb(0 0 0 / 0.5)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'white', padding: 24, borderRadius: 12 }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

function Card({ withPortal }: { withPortal: boolean }) {
  const [open, setOpen] = useState(false)

  const dialog = (
    <Dialog onClose={() => setOpen(false)}>
      <p>
        {withPortal ? 'I cover the whole page.' : "I'm stuck inside the card."}
      </p>
    </Dialog>
  )

  return (
    <div
      style={cardStyle}
      onClick={() =>
        console.log(`Card clicked (${withPortal ? 'portal' : 'no portal'})`)
      }
    >
      <h3>{withPortal ? '✅ With portal' : '❌ Without portal'}</h3>
      <button onClick={() => setOpen(true)}>Open dialog</button>

      {open && (withPortal ? createPortal(dialog, document.body) : dialog)}
    </div>
  )
}

export function PortalDemo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Card withPortal={false} />
      <Card withPortal />
    </div>
  )
}
