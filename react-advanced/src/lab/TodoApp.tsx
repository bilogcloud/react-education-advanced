import { useEffect, useState } from 'react'

import type { Todo } from '@/day2/types.ts'

import { api } from '../day2/api.ts'

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [reloadKey, setReloadKey] = useState(0) // bump to refetch
  const [title, setTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  // Load the list (and reload it whenever reloadKey changes)
  useEffect(() => {
    const controller = new AbortController()
    setError(null)

    api<Todo[]>('/todos', { signal: controller.signal })
      .then(setTodos)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err)
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [reloadKey])

  // Add: POST, then refetch the whole list by hand
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setIsAdding(true)
    try {
      await api<Todo>('/todos', {
        method: 'POST',
        body: JSON.stringify({ title, done: false }),
      })
      setTitle('')
      setReloadKey((k) => k + 1)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsAdding(false)
    }
  }

  // Toggle: wait for the server, THEN update the list (feels slow)
  async function handleToggle(todo: Todo) {
    setTogglingId(todo.id)
    try {
      const updated = await api<Todo>(`/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: !todo.done }),
      })
      setTodos((current) =>
        current.map((t) => (t.id === updated.id ? updated : t)),
      )
    } catch (err) {
      setError(err as Error)
    } finally {
      setTogglingId(null)
    }
  }

  if (isLoading) return <p>Loading todos…</p>
  if (error) return <p role="alert">Error: {error.message}</p>

  return (
    <section>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button disabled={isAdding}>{isAdding ? 'Adding…' : 'Add'}</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                disabled={togglingId === todo.id}
                onChange={() => handleToggle(todo)}
              />{' '}
              {todo.title}
            </label>
          </li>
        ))}
      </ul>

      {/* The counter needs the list passed down as a prop */}
      <RemainingCount todos={todos} />
    </section>
  )
}

function RemainingCount({ todos }: { todos: Todo[] }) {
  return <p>Remaining: {todos.filter((t) => !t.done).length}</p>
}
