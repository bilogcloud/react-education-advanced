import { Activity, useState } from 'react'

export function Tabs() {
  const [tab, setTab] = useState<'profile' | 'settings'>('profile')
  return (
    <>
      <button onClick={() => setTab('profile')}>Profile</button>
      <button onClick={() => setTab('settings')}>Settings</button>

      <Activity mode={tab === 'profile' ? 'visible' : 'hidden'}>
        <ProfileForm />
      </Activity>
      <Activity mode={tab === 'settings' ? 'visible' : 'hidden'}>
        <SettingsForm />
      </Activity>
    </>
  )
}

function ProfileForm() {
  return <input placeholder="Your name" /> // typed text survives tab switches
}

function SettingsForm() {
  return (
    <label>
      <input type="checkbox" /> Email notifications
    </label>
  )
}
