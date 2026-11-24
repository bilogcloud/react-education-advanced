import type { ReactNode } from 'react'

type ListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  renderEmpty?: () => ReactNode
}

export function List<T>({ items, renderItem, renderEmpty }: ListProps<T>) {
  if (items.length === 0) return <>{renderEmpty?.() ?? <p>No items</p>}</>
  
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item, i)}</li>
      ))}
    </ul>
  )
}
