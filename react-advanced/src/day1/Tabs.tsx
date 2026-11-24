import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useState,
} from 'react'

type TabsContextValue = {
  active: string
  setActive: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs.* components must be used inside <Tabs>')
  return ctx
}

export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string
  children: ReactNode
}) {
  const [active, setActive] = useState(defaultValue)
  const baseId = useId()
  return (
    <TabsContext value={{ active, setActive, baseId }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>
}

Tabs.Tab = function Tab({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  const { active, setActive, baseId } = useTabs()
  const selected = active === value
  return (
    <button
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  )
}

Tabs.Panel = function TabPanel({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  const { active, baseId } = useTabs()
  if (active !== value) return null
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
    >
      {children}
    </div>
  )
}
