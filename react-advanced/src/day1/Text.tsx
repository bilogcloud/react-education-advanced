import type { ComponentPropsWithoutRef, ElementType } from 'react'

type TextProps<E extends ElementType> = {
  as?: E
  size?: 'sm' | 'md' | 'lg'
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'size'>

export function Text<E extends ElementType = 'p'>({
  as,
  size = 'md',
  ...rest
}: TextProps<E>) {
  const Component = as ?? 'p'
  return <Component className={`text-${size}`} {...rest} />
}
