import { useCallback, useState } from 'react'

export function Toggle(props: {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (p: boolean) => void
}) {
  const [pressed, setPressed] = useControllableState({
    value: props.pressed,
    defaultValue: props.defaultPressed ?? false,
    onChange: props.onPressedChange,
  })
  return (
    <button aria-pressed={pressed} onClick={() => setPressed(!pressed)}>
      {pressed ? 'On' : 'Off'}
    </button>
  )
}

type ControllableProps<T> = {
  value?: T // controlled when defined
  defaultValue: T // initial value when uncontrolled
  onChange?: (value: T) => void
}

function useControllableState<T>({
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
