import './Card.css'

// Rule of thumb for creating custom (UI) components
// 1. <Button variant="primary">Click me</Button>
// 2. <Dialog actions={<></>}>...</Dialog>
// 3. Composition card

type FooterButton = {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

type CardProps = {
  title: string
  subtitle?: string
  showAvatar?: boolean
  avatarUrl?: string
  showFooter?: boolean
  footerButtons?: FooterButton[]
  headerAlign?: 'left' | 'center'
  children?: React.ReactNode
}

export function Card2({
  title,
  subtitle,
  showAvatar,
  avatarUrl,
  showFooter,
  footerButtons,
  headerAlign = 'left',
  children,
}: CardProps) {
  return (
    <article className="card">
      <header className={`card-header card-header-${headerAlign}`}>
        {showAvatar && avatarUrl && (
          <img className="avatar" src={avatarUrl} alt="" />
        )}
        <div>
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      </header>

      {children && <div className="card-body">{children}</div>}

      {showFooter && footerButtons && (
        <footer className="card-footer">
          {footerButtons.map((b) => (
            <button
              key={b.label}
              className={`btn btn-${b.variant ?? 'primary'}`}
              onClick={b.onClick}
            >
              {b.label}
            </button>
          ))}
        </footer>
      )}
    </article>
  )
}

// New features:
// a "Paid" badge next to the title → badge and badgeColor props

// a link in the footer instead of a button → href on FooterButton,
// plus a branch inside the map

// a disabled button while paying → disabled and loading on FooterButton

// an icon instead of an avatar → icon, and a rule for what happens when
// both are set

// a footer with text on the left and buttons on the right
// → footerText and footerLayout
