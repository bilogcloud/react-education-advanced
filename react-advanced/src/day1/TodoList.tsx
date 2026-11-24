import { useState } from 'react'

type Todo = { id: string; title: string }

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 'a', title: 'Write slides' },
    { id: 'b', title: 'Book room' },
  ])

  const addToTop = () => {
    setTodos((t) => [{ id: crypto.randomUUID(), title: 'New task' }, ...t])
  }

  return (
    <>
      <button onClick={addToTop}>Add to top</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.title} <input placeholder="note" />
          </li>
        ))}
      </ul>
    </>
  )
}
