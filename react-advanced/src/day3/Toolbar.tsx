import { type Ref, useImperativeHandle, useRef } from 'react'

export type SearchInputHandle = { focus: () => void; clear: () => void }

function SearchInput({ ref }: { ref?: Ref<SearchInputHandle> }) {
  const inputRef = useRef<HTMLInputElement>(null)

  // The parent gets ONLY focus() and clear(), not the whole <input>
  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) inputRef.current.value = ''
      },
    }),
    [],
  )

  return <input ref={inputRef} placeholder="Search" />
}

export function Toolbar() {
  const searchRef = useRef<SearchInputHandle>(null)
  return (
    <>
      <SearchInput ref={searchRef} />
      <button onClick={() => searchRef.current?.focus()}>Focus</button>
      <button onClick={() => searchRef.current?.clear()}>Clear</button>
    </>
  )
}
