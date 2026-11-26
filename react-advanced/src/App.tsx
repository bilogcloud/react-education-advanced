import './App.css'
import { useState } from 'react'

import { ProductList } from '@/day2/ProductList.tsx'

function App() {
  const [search, setSearch] = useState('')

  return (
    <div style={{ height: '100dvh' }}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <br />
      <br />
      <br />
      <ProductList search={search} />
    </div>
  )
}

export default App
