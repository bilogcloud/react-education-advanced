import type { ReactNode } from 'react'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
}

export function Button({
  variant = 'primary',
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {icon}
      {/*{children}*/}
    </button>
  )
}
