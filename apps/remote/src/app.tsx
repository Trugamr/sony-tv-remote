import { FormEvent, useMemo, useState } from 'react'
import { Api } from 'api'

export function App() {
  const [error, setError] = useState<Error | null>(null)
  const initialValues = useMemo(() => {
    return {
      host: localStorage.getItem('host') ?? '',
      psk: localStorage.getItem('psk') ?? '',
    }
  }, [])

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent default form submission
    event.preventDefault()
    // Clear error
    setError(null)
    // Get form data from event
    const formData = new FormData(event.currentTarget)
    console.log(Object.fromEntries(formData))
    // Get the values submitted in the form
    const host = formData.get('host') as string
    const psk = formData.get('psk') as string
    // Create api instance
    const api = new Api({ host, psk })
    // Turn on the tv
    api
      .invoke({
        endpoint: '/sony/system',
        method: 'setPowerStatus',
        params: [{ status: true }],
      })
      .then(() => {
        console.log('success', 'persisting host and psk')
        localStorage.setItem('host', host)
        localStorage.setItem('psk', psk)
      })
      .catch(error => {
        if (error instanceof Error) {
          setError(error)
        }
        console.error(error)
      })
  }

  return (
    <main className="gap flex h-full w-full flex-col items-center justify-center bg-black p-6 text-white">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-end gap-2.5 text-sm">
        <div className="flex gap-2 text-black">
          <input
            className="px-2 py-1"
            name="host"
            placeholder="host"
            type="text"
            defaultValue={initialValues.host}
            required
          />
          <input
            className="px-2 py-1"
            name="psk"
            placeholder="pre shared key"
            type="password"
            defaultValue={initialValues.psk}
            required
          />
        </div>
        {error ? (
          <span className="my-0.5 font-mono text-xs text-red-500">{error.message}</span>
        ) : null}
        <button
          className="mt-4 border bg-white px-2.5 py-0.5 text-black active:scale-95"
          value="on"
        >
          power on
        </button>
      </form>
    </main>
  )
}
