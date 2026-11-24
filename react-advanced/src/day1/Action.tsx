import type { ComponentProps } from 'react'

type ActionProps =
  | ({ as: 'button' } & ComponentProps<'button'>)
  | ({ as: 'link'; href: string } & ComponentProps<'a'>);

export function Action(props: ActionProps) {
  if (props.as === 'link') {
    const { as, ...rest } = props; // TypeScript knows this is an <a>
    return <a {...rest} />;
  }
  const { as, ...rest } = props; // and this is a <button>
  return <button {...rest} />;
}