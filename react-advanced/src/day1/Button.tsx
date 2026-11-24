import type { ComponentProps, ReactNode } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
}

export function Button({
  variant = 'primary',
  icon,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {icon}
      {children}
    </button>
  )
}
