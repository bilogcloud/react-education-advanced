import { useEffect, useEffectEvent } from 'react'

export function ChatRoom({
  roomId,
  theme,
}: {
  roomId: string
  theme: 'light' | 'dark'
}) {
  const onConnected = useEffectEvent(() => {
    showNotification(`Connected to ${roomId}`, theme)
  })

  useEffect(() => {
    const connection = createConnection(roomId)
    connection.on('connected', onConnected)
    connection.connect()
    return () => connection.disconnect()
  }, [roomId]) // only roomId: switching theme no longer reconnects

  return <h1>Room: {roomId}</h1>
}

function createConnection(roomId: string) {
  let onConnected: (() => void) | null = null
  let timeoutId: number | undefined

  return {
    on(event: 'connected', callback: () => void) {
      if (event === 'connected') onConnected = callback
    },
    connect() {
      console.log(`🔌 Connecting to "${roomId}"…`)
      timeoutId = window.setTimeout(() => onConnected?.(), 500) // pretend the server answers
    },
    disconnect() {
      clearTimeout(timeoutId)
      console.log(`❌ Disconnected from "${roomId}"`)
    },
  }
}

function showNotification(message: string, theme: 'light' | 'dark') {
  const toast = document.createElement('div')
  toast.textContent = message
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: theme === 'dark' ? '#111' : '#fff',
    color: theme === 'dark' ? '#fff' : '#111',
  })
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 2000)
}
