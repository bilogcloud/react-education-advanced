import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { API } from '@/day2/api.ts'
import { TodoApp } from '@/day3/TodoApp.tsx'
import { server } from '@/tests/mocks/server.ts'
import { renderWithClient } from '@/tests/utils/renderWithClient.tsx'

test('loads and shows the todos', async () => {
  renderWithClient(<TodoApp />)

  expect(screen.getByText('Loading todos…')).toBeInTheDocument()
  expect(await screen.findByText('Write tests')).toBeInTheDocument() // waits for MSW
  expect(screen.getByText('Remaining: 1')).toBeInTheDocument()
})

test('shows an error when loading fails', async () => {
  server.use(
    http.get(`${API}/todos`, () => new HttpResponse(null, { status: 500 })),
  )
  renderWithClient(<TodoApp />)

  expect(await screen.findByRole('alert')).toHaveTextContent('500')
})
