import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LoginForm } from '@/day3/LoginForm.tsx'

test('shows an error for an invalid email', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(<LoginForm onSubmit={onSubmit} />)

  await user.type(screen.getByLabelText('Email'), 'not-an-email')
  await user.click(screen.getByRole('button', { name: 'Log in' }))

  expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email')
  expect(onSubmit).not.toHaveBeenCalled()
})

test('submits a valid email', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(<LoginForm onSubmit={onSubmit} />)

  const email = 'ana@example.com'

  await user.type(screen.getByLabelText('Email'), email)
  await user.keyboard('{Enter}')

  expect(onSubmit).toHaveBeenCalledWith(email)
})
