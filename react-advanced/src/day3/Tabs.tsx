import { Activity, useState } from 'react'

import { api } from '@/day2/api.ts'

export function Tabs() {
  const [tab, setTab] = useState<'profile' | 'settings'>('profile')

  async function handleAction(formData: FormData) {
    const name = String(formData.get('name'))
    const notificationsEnabled = String(formData.get('notificationsEnabled'))
    const payload = { name, notificationsEnabled }

    await api('/subscribers', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  return (
    <>
      <button onClick={() => setTab('profile')}>Profile</button>
      <button onClick={() => setTab('settings')}>Settings</button>

      <form action={handleAction}>
        <Activity mode={tab === 'profile' ? 'visible' : 'hidden'}>
          <ProfileStep />
        </Activity>
        <Activity mode={tab === 'settings' ? 'visible' : 'hidden'}>
          <SettingsStep />
        </Activity>
      </form>
    </>
  )
}

function ProfileStep() {
  return <input name="name" placeholder="Your name" /> // typed text survives tab switches
}

function SettingsStep() {
  return (
    <label>
      <input name="notificationsEnabled" type="checkbox" /> Email notifications
    </label>
  )
}
