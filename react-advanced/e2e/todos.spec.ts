// e2e/todos.spec.ts — assumes the app shows <TodoApp /> on the home page
import { expect, test } from '@playwright/test'

test('a user can add a todo', async ({ page }) => {
  await page.goto('/')

  // A unique title, because json-server really saves to db.json
  const title = `Buy milk ${Date.now()}`
  await page.getByRole('textbox', { name: 'New todo' }).fill(title)
  await page.getByRole('button', { name: 'Add' }).click()

  await expect(page.getByText(title)).toBeVisible()

  await page.reload()
  await expect(page.getByText(title)).toBeVisible()
})
