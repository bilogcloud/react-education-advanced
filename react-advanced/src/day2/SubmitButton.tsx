import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ children = 'Save' }: { children?: ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving…' : children}
    </button>
  )
}
