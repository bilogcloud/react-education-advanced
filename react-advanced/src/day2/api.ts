export const API = 'http://localhost:3001'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok)
    throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${res.status}`)
  return res.json()
}
