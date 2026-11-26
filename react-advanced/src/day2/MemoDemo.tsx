import { useState } from 'react'

type Product = { id: string; name: string; price: number }

const products: Product[] = Array.from({ length: 300 }, (_, i) => ({
  id: String(i),
  name: `Product ${i}`,
  price: Math.round(Math.random() * 100),
}))

function SlowItem({
  product,
  onSelect,
}: {
  product: Product
  onSelect: (id: string) => void
}) {
  const start = performance.now()
  while (performance.now() - start < 1) {}
  return (
    <li onClick={() => onSelect(product.id)}>
      {product.name} — €{product.price}
    </li>
  )
}

type ListProps = { products: Product[]; onSelect: (id: string) => void }

function ProductList({ products, onSelect }: ListProps) {
  console.log('ProductList rendered')
  return (
    <ul>
      {products.map((p) => (
        <SlowItem key={p.id} product={p} onSelect={onSelect} />
      ))}
    </ul>
  )
}

export function ProductsPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <Note />
      <p>Selected: {selected ?? 'none'}</p>
      <ProductList products={products} onSelect={(id) => setSelected(id)} />
    </>
  )
}

function Note() {
  const [note, setNote] = useState('')

  return (
    <input
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Type a note"
    />
  )
}
