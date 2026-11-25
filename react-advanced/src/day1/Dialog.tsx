type DialogProps = {
  title: React.ReactNode
  actions?: React.ReactNode // slot
  children: React.ReactNode
}

export function Dialog({ title, actions, children }: DialogProps) {
  return (
    <div role="dialog" aria-modal="true" className="dialog">
      <h2>{title}</h2>
      <div className="dialog-body">{children}</div>
      {actions && <div className="dialog-actions">{actions}</div>}
    </div>
  )
}
