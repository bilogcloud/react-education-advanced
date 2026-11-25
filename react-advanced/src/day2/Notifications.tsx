// notifications.tsx
import { create } from 'zustand'

type Notification = { id: string; text: string; read: boolean }

type NotificationsState = {
  items: Notification[]
  panelOpen: boolean
  add: (text: string) => void
  togglePanel: () => void
}

export const useNotifications = create<NotificationsState>()((set) => ({
  items: [],
  panelOpen: false,
  add: (text) =>
    set((s) => ({
      items: [...s.items, { id: crypto.randomUUID(), text, read: false }],
    })),
  // Opening the panel marks everything as read
  togglePanel: () =>
    set((s) => ({
      panelOpen: !s.panelOpen,
      items: s.panelOpen ? s.items : s.items.map((n) => ({ ...n, read: true })),
    })),
}))

// Shows the number of unread notifications
export function UnreadBadge() {
  const unread = useNotifications((s) => s.items.filter((n) => !n.read).length)
  if (unread === 0) return null
  return <span className="badge">{unread}</span>
}

// Bell button that opens and closes the panel
export function PanelToggle() {
  const togglePanel = useNotifications((s) => s.togglePanel)
  return (
    <button onClick={togglePanel}>
      🔔 <UnreadBadge />
    </button>
  )
}

// The panel the toggle opens
export function NotificationPanel() {
  const panelOpen = useNotifications((s) => s.panelOpen)
  const items = useNotifications((s) => s.items)
  if (!panelOpen) return null
  return (
    <ul>
      {items.length === 0 && <li>No notifications</li>}
      {items.map((n) => (
        <li key={n.id}>{n.text}</li>
      ))}
    </ul>
  )
}
