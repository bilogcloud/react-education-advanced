import { useId, useState } from 'react'

export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial)
  const id = useId()

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((o) => !o),
    // prop getters: spread onto whatever elements the caller chooses
    getButtonProps: () => ({
      'aria-expanded': isOpen,
      'aria-controls': id,
      onClick: () => setIsOpen((o) => !o),
    }),
    getPanelProps: () => ({ id, hidden: !isOpen }),
  }
}

// Two completely different UIs, same behaviour
export function FaqItem({ q, a }: { q: string; a: string }) {
  const { getButtonProps, getPanelProps } = useDisclosure()
  return (
    <div>
      <button {...getButtonProps()}>{q}</button>
      <p {...getPanelProps()}>{a}</p>
    </div>
  )
}

export function SideMenu() {
  const menu = useDisclosure()
  return (
    <nav>
      <button className="hamburger" {...menu.getButtonProps()}>
        ☰
      </button>
      <ul {...menu.getPanelProps()}>Unorder list of menu items</ul>
    </nav>
  )
}
