import { createContext, useContext } from 'react'

export function createSafeContext<T>(name: string) {
  const Context = createContext<T | null>(null)
  function useSafeContext() {
    const value = useContext(Context)
    if (value === null)
      throw new Error(`use${name} must be used inside <${name}Provider>`)
    return value
  }
  return [Context, useSafeContext] as const
}
