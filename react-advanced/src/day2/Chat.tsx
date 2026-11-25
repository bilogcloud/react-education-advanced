import { useOptimistic, useState } from 'react'

import { api } from '@/day2/api.ts'
import { SubmitButton } from '@/day2/SubmitButton.tsx'

type Message = { id: string; text: string; sending?: boolean }

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current: Message[], text: string) => [
      ...current,
      { id: `temp-${Date.now()}`, text, sending: true },
    ],
  )

  async function sendAction(formData: FormData) {
    const text = String(formData.get('text'))
    addOptimistic(text)
    const saved = await api<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
    setMessages((current) => [...current, saved]) // the real message replaces the temporary one
  }

  return (
    <>
      <ul>
        {optimisticMessages.map((m) => (
          <li key={m.id} style={{ opacity: m.sending ? 0.5 : 1 }}>
            {m.text} {m.sending && <small>(sending…)</small>}
          </li>
        ))}
      </ul>
      <form action={sendAction}>
        <input name="text" required />
        <SubmitButton>Send</SubmitButton>
      </form>
    </>
  )
}
