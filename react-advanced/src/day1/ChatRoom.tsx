import { useEffect } from 'react'

export function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(roomId)
    connection.connect()
    return () => connection.disconnect() // stop syncing with the old room
  }, [roomId]) // start syncing again whenever roomId changes

  return <h1>Welcome to room: {roomId}</h1>
}

function createConnection(roomId: string) {
  const connect = () => {
    console.log(`Connected to ${roomId}`)
  }

  const disconnect = () => {
    console.log(`Disconnected from ${roomId}`)
  }

  return { connect, disconnect }
}
