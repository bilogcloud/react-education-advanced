import type { ReactNode } from 'react'

type TableProps<T> = {
  rows: T[]
  columns: { header: string; cell: (row: T) => ReactNode }[]
  getRowKey: (row: T) => string
}

export function Table<T>({ rows, columns, getRowKey }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.header}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={getRowKey(row)}>
            {columns.map((c) => (
              <td key={c.header}>{c.cell(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
