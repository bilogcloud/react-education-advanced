import './App.css'
import { ProductSearch } from '@/lab/ProductSearch.tsx'

function App() {
  return (
    <div style={{ height: '100dvh' }}>
      <ProductSearch category={"posts"} />
    </div>
  )
}

export default App
