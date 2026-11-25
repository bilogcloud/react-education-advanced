import { useState, useTransition } from 'react'

function SlowPosts() {
  const items = Array.from({ length: 500 }, (_, i) => (
    <SlowPost key={i} index={i} />
  ))
  return <ul>{items}</ul>
}

function SlowPost({ index }: { index: number }) {
  const start = performance.now()
  while (performance.now() - start < 1) {} // 1 ms each → 500 ms total
  return <li>Post #{index + 1}</li>
}

export function Tabs() {
  const [tab, setTab] = useState<'about' | 'posts' | 'contact'>('about')
  const [isPending, startTransition] = useTransition()

  function selectTab(next: typeof tab) {
    startTransition(() => setTab(next)) // non-urgent
  }

  return (
    <>
      <nav style={{ opacity: isPending ? 0.6 : 1 }}>
        <button onClick={() => selectTab('about')}>About</button>
        <button onClick={() => selectTab('posts')}>Posts (slow)</button>
        <button onClick={() => selectTab('contact')}>Contact</button>
      </nav>
      {tab === 'about' && <p>About us</p>}
      {tab === 'posts' && <SlowPosts />}
      {tab === 'contact' && <p>Contact us</p>}
    </>
  )
}
