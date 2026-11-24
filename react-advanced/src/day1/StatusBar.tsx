import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // value on the client
    () => true, // value during server rendering
  )
}

export function StatusBar() {
  const isOnline = useOnlineStatus()
  return <p>{isOnline ? 'Online' : 'Offline'}</p>
}
