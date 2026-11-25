import { useActionState } from 'react'

import { api } from '@/day2/api.ts'
import { SubmitButton } from '@/day2/SubmitButton.tsx'
import type { Todo } from '@/day2/types.ts'

type FormState = { error: string | null; title: string; saved: Todo | null }

async function addTodoAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = String(formData.get('title') ?? '').trim()

  if (title.length < 3) {
    // return the value too, so the field isn't emptied by the automatic reset
    return { error: 'Title must be at least 3 characters', title, saved: null }
  }
  try {
    const saved = await api<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify({ title, done: false }),
    })
    return { error: null, title: '', saved }
  } catch (e) {
    return { error: (e as Error).message, title, saved: null }
  }
}

export function AddTodoForm() {
  const [state, formAction, isPending] = useActionState(addTodoAction, {
    error: null,
    title: '',
    saved: null,
  })

  return (
    <form action={formAction}>
      <input
        placeholder="Title"
        name="title"
        defaultValue={state.title}
        aria-invalid={!!state.error}
      />
      <SubmitButton />
      {state.error && <p role="alert">{state.error}</p>}
      {state.saved && <p>Added “{state.saved.title}”</p>}
      {isPending && <small>Saving…</small>}
    </form>
  )
}
