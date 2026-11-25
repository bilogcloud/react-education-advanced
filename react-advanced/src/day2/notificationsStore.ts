import { create } from 'zustand'

type Notification = { id: string; text: string; read: boolean }

type NotificationsState = {
  items: Notification[]
  panelOpen: boolean
  add: (text: string) => void
  markAllRead: () => void
  togglePanel: () => void
}

// create returns a hook; state and actions live together
export const useNotifications = create<NotificationsState>()((set) => ({
  items: [
    { id: '1', text: 'Not 1', read: false },
    { id: '2', text: 'Not 2', read: true },
  ],
  panelOpen: false,
  add: (text) =>
    set((s) => ({
      items: [...s.items, { id: crypto.randomUUID(), text, read: false }],
    })),
  markAllRead: () =>
    set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
  togglePanel: () => set((s) => ({ panelOpen: !s.panelOpen })), 
}))
