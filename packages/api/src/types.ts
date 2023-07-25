export type InvokeOptions = {
  id?: number
  endpoint: string
  method: string
  version?: string
  params?: unknown
}

export type InvokeResult = {
  id: number
  result: unknown[]
}

export type ApiOptions = {
  host: string
  psk?: string
}
