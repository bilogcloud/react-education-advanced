import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { productKeys } from '@/day2/productKeys.ts'
import type { Todo } from '@/day2/types.ts'

import { api } from './api'

export function TodoList() {
  const queryClient = useQueryClient()
  const [simulateFailure, setSimulateFailure] = useState(false)

  const {
    data: todos,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: productKeys.todos(),
    queryFn: () => api<Todo[]>('/todos'),
  })

  const toggleTodo = useMutation({
    mutationFn: async (todo: Todo) => {
      if (simulateFailure) {
        await new Promise((r) => setTimeout(r, 800))
        throw new Error('Server error (simulated)')
      }
      return api<Todo>(`/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: !todo.done }),
      })
    },

    // Runs BEFORE the request is sent
    onMutate: async (todo) => {
      // 1. Cancel refetches in flight, so an old response can't overwrite our change
      await queryClient.cancelQueries({ queryKey: productKeys.todos() })

      // 2. Take a snapshot of the current list, for rollback
      const prijasnjiTodovi = queryClient.getQueryData<Todo[]>(['todos'])

      // 3. Write the expected result into the cache. The UI updates immediately.
      queryClient.setQueryData<Todo[]>(['todos'], (previousTodos) =>
        previousTodos?.map((t) =>
          t.id === todo.id ? { ...t, done: !t.done } : t,
        ),
      )

      // 4. Whatever we return here is passed to onError and onSettled
      return { prijasnjiTodovi }
    },

    // Runs if mutationFn throws: put the snapshot back
    onError: (_error, _todo, result) => {
      queryClient.setQueryData(['todos'], result?.prijasnjiTodovi)
    },

    // Runs after success OR error: refetch so the cache matches the server exactly
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  if (isPending) return <p>Loading…</p>
  if (isError) return <p role="alert">{error.message}</p>

  return (
    <section>
      <label>
        <input
          type="checkbox"
          checked={simulateFailure}
          onChange={(e) => setSimulateFailure(e.target.checked)}
        />
        Make saves fail
      </label>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo.mutate(todo)}
              />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>

      {toggleTodo.isError && (
        <p role="alert">Couldn't save: {toggleTodo.error.message}</p>
      )}
    </section>
  )
}
