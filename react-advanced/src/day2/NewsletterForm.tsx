import { api } from '@/day2/api.ts'

export function NewsletterForm() {
  async function subscribe(formData: FormData) {
    const email = String(formData.get('email'))
    await api('/subscribers', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  return (
    <form action={subscribe}>
      <input name="email" type="email" required />
      <button>Subscribe</button>
    </form>
  )
}
