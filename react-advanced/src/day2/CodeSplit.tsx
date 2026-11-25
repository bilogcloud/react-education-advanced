import { lazy, Suspense, useState } from 'react'

// The import is a separate chunk; the module needs a default export
const loadAdminPanel = () => import('./AdminPanel')
const AdminPanel = lazy(loadAdminPanel)

export function CodeSplit() {
  const [showAdmin, setShowAdmin] = useState(false)
  return (
    <>
      <button
        onMouseEnter={loadAdminPanel} // start downloading on hover
        onFocus={loadAdminPanel}
        onClick={() => setShowAdmin(true)}
      >
        Open admin
      </button>

      {showAdmin && (
        <Suspense fallback={<p>Loading admin…</p>}>
          <AdminPanel />
        </Suspense>
      )}
    </>
  )
}
