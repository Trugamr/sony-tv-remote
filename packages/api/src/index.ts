import type { $Fetch } from 'ofetch'
import { ofetch } from 'ofetch'
import type { Endpoint, Method, ApiOptions, InvokeOptions, InvokeResult } from './types.js'

export class Api {
  #client: $Fetch

  constructor({ host, psk }: ApiOptions) {
    const headers = new Headers()
    if (psk) {
      headers.set('X-AUTH-PSK', psk)
    }

    this.#client = ofetch.create({ baseURL: host, headers })
  }

  invoke<T extends Endpoint, U extends Method>({
    id = 1,
    endpoint,
    method,
    version = '1.0',
    params = [''],
  }: InvokeOptions<T, U>) {
    return this.#client<InvokeResult<T, U>>(endpoint, {
      method: 'POST',
      body: { id, method, version, params },
    })
  }
}
