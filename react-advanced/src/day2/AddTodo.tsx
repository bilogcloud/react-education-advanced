import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { api } from '@/day2/api.ts'
import type { Todo } from '@/day2/types.ts'

export function AddTodo() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')

  const addTodo = useMutation({
    mutationFn: (title: string) =>
      api<Todo>('/todos', {
        method: 'POST',
        body: JSON.stringify({ title, done: false }),
      }),
    onSuccess: () => {
      setTitle('')
      // Mark every query starting with ['todos'] stale and refetch the active ones
      void queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addTodo.mutate(title)
      }}
    >
      <input
        placeholder="Add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button disabled={addTodo.isPending}>
        {addTodo.isPending ? 'Adding…' : 'Add'}
      </button>
      {addTodo.isError && <p role="alert">{addTodo.error.message}</p>}
    </form>
  )
}
