import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Counter } from './Counter'

test('increments when the button is clicked', async () => {
  // AAA testing - Arrange-Act-Assert pattern

  // Arrange
  const user = userEvent.setup()
  render(<Counter />)
  expect(screen.getByText('Count: 0')).toBeInTheDocument()

  // Act
  await user.click(screen.getByRole('button', { name: 'Increment' }))

  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
