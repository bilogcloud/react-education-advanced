import { useEffect } from 'react'

export function WindowSize() {
  useEffect(() => {
    const onResize = () => console.log('resized')
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return null
}
