import { act, renderHook } from '@testing-library/react'

import { useControllableState } from '@/day3/useControllableState.ts'

test('works uncontrolled', () => {
  const { result } = renderHook(() =>
    useControllableState({ defaultValue: 'a' }),
  )

  act(() => result.current[1]('b'))
  expect(result.current[0]).toBe('b')
})
