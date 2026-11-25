function Cup() {
  let guest = 0

  guest = guest + 1
  return <h2>Tea cup for guest #{guest}</h2>
}

export function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  )
}
