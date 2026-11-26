import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { api } from '@/day2/api.ts'
import type { Todo } from '@/day2/types.ts'

const todoKeys = { all: ['todos'] as const }

function useTodos() {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: () => api<Todo[]>('/todos'),
  })
}

function useAddTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (title: string) =>
      api<Todo>('/todos', {
        method: 'POST',
        body: JSON.stringify({ title, done: false }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.all }),
  })
}

function useToggleTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (todo: Todo) =>
      api<Todo>(`/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: !todo.done }),
      }),

    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all })
      const previous = queryClient.getQueryData<Todo[]>(todoKeys.all)
      queryClient.setQueryData<Todo[]>(todoKeys.all, (old) =>
        old?.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)),
      )
      return { previous }
    },
    onError: (_error, _todo, result) => {
      queryClient.setQueryData(todoKeys.all, result?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todoKeys.all }),
  })
}

export function TodoApp() {
  const { data: todos, isPending, isError, error, isFetching } = useTodos()
  const addTodo = useAddTodo()
  const toggleTodo = useToggleTodo()
  const [title, setTitle] = useState('')

  if (isPending) return <p>Loading todos…</p>
  if (isError) return <p role="alert">Error: {error.message}</p>

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo.mutate(title, { onSuccess: () => setTitle('') })
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="New todo"
          required
        />
        <button disabled={addTodo.isPending}>
          {addTodo.isPending ? 'Adding…' : 'Add'}
        </button>
      </form>

      {isFetching && <small>Refreshing…</small>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo.mutate(todo)}
              />{' '}
              {todo.title}
            </label>
          </li>
        ))}
      </ul>

      {toggleTodo.isError && (
        <p role="alert">Couldn't save: {toggleTodo.error.message}</p>
      )}

      <RemainingCount />
    </section>
  )
}

function RemainingCount() {
  const { data: todos = [] } = useTodos()
  return <p>Remaining: {todos.filter((t) => !t.done).length}</p>
}
