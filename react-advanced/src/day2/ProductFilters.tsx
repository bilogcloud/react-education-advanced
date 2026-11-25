import { useSearchParams } from 'react-router'

export function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read: plain URLSearchParams, so values are strings (or null)
  const search = searchParams.get('q') ?? ''
  const sort = searchParams.get('sort') ?? 'price'

  // Write: change one key, keep the others
  function update(key: string, value: string) {
    setSearchParams(
      (prev) => {
        if (value) prev.set(key, value)
        else prev.delete(key)
        return prev
      },
      { replace: true }, // don't add a history entry for every keystroke
    )
  }

  return (
    <>
      <input
        value={search}
        onChange={(e) => update('q', e.target.value)}
        placeholder="Search"
      />
      <br/>
      <select value={sort} onChange={(e) => update('sort', e.target.value)}>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </>
  )
}
// URL: /products?q=mug&sort=name
