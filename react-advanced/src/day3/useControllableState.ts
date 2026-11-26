import { useCallback, useState } from 'react'

type ControllableProps<T> = {
  value?: T // controlled when defined
  defaultValue: T // initial value when uncontrolled
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableProps<T>) {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [current, setValue] as const
}
