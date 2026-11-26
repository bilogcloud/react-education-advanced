import { http, HttpResponse } from 'msw'

import { API } from '@/day2/api.ts'
import type { Todo } from '@/day2/types.ts'

const initialTodos: Todo[] = [
  { id: '1', title: 'Write tests', done: false },
  { id: '2', title: 'Book room', done: true },
]

let todos = [...initialTodos]
export const resetTodos = () => {
  todos = [...initialTodos]
}

export const handlers = [
  http.get(`${API}/todos`, () => HttpResponse.json(todos)),

  http.post(`${API}/todos`, async ({ request }) => {
    const body = (await request.json()) as Omit<Todo, 'id'>
    const todo = { ...body, id: String(Date.now()) }
    todos = [...todos, todo]
    return HttpResponse.json(todo, { status: 201 })
  }),

  http.patch(`${API}/todos/:id`, async ({ params, request }) => {
    const changes = (await request.json()) as Partial<Todo>
    todos = todos.map((t) => (t.id === params.id ? { ...t, ...changes } : t))
    return HttpResponse.json(todos.find((t) => t.id === params.id))
  }),
]
