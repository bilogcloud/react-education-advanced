import './App.css'
import { useState } from 'react'

import { UserProfile } from '@/day1/UserProfile.tsx'

function App() {
  const [userId, setUserId] = useState('1')

  return (
    <div style={{ height: '100dvh' }}>
      <button onClick={() => setUserId('1')}>Set user 1</button>
      <button onClick={() => setUserId('2')}>Set user 2</button>

      <br />
      <br />
      <br />
      <br />
      <br />
      <UserProfile key={userId} userId={userId} />
    </div>
  )
}

export default App
