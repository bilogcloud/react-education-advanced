import '@testing-library/jest-dom/vitest'
import { resetTodos } from './mocks/handlers'
import { server } from './mocks/server'

// @ts-expect-error
beforeAll(() => server.listen({ onUnhandledRequest: 'error' })) // unknown URLs fail loudly
afterEach(() => {
  server.resetHandlers() // undo per-test overrides
  resetTodos() // fresh data for the next test
})
afterAll(() => server.close())
