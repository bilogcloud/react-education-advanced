import { useControllableState } from '@/day3/useControllableState.ts'

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
