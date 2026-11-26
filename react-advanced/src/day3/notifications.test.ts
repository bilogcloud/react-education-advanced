// notifications.test.ts
import { beforeEach, expect, test } from 'vitest'
import { useNotifications } from '@/day2/Notifications.tsx'

beforeEach(() => {
  useNotifications.setState({ items: [], panelOpen: false })
})

test('add creates an unread notification', () => {
  useNotifications.getState().add('Build finished')

  const { items } = useNotifications.getState()
  expect(items).toHaveLength(1)
  expect(items[0]).toMatchObject({ text: 'Build finished', read: false })
})

test('opening the panel marks everything as read', () => {
  const { add, togglePanel } = useNotifications.getState()
  add('One')
  add('Two')

  togglePanel()

  const state = useNotifications.getState()
  expect(state.panelOpen).toBe(true)
  expect(state.items.every((n) => n.read)).toBe(true)
})
