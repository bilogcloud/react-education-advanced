import { useState } from 'react'

export function ProfileApp() {
  const [userId, setUserId] = useState('user-1')
  return (
    <div>
      <button onClick={() => setUserId('user-1')}>User 1</button>
      <button onClick={() => setUserId('user-2')}>User 2</button>
      <ProfileForm key={userId}  userId={userId} />
    </div>
  )
}

type ProfileFormProps = {
  userId: string
}

function ProfileForm({ userId }: ProfileFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  console.log('ProfileApp mounted for:', userId)

  return (
    <form>
      <h2>Editing user: {userId}</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <button type="submit">Save</button>
    </form>
  )
}
