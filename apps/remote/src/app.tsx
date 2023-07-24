import { Api } from 'api'

const api = new Api()

export function App() {
  return (
    <main className="flex h-full w-full flex-col items-start gap-4 bg-gray-100 p-6">
      <h1 className="text-xl font-medium">Remote</h1>
      <div className="rounded-sm border-2 border-dashed border-white bg-black p-8 text-white shadow">
        <pre>{JSON.stringify(api.info(), null, 2)}</pre>
      </div>
    </main>
  )
}
