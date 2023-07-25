import type { $Fetch } from 'ofetch'
import { ofetch } from 'ofetch'
import type { ApiOptions, InvokeOptions, InvokeResult } from './types.js'

export class Api {
  #client: $Fetch

  constructor({ host, psk }: ApiOptions) {
    const headers = new Headers()
    if (psk) {
      headers.set('X-AUTH-PSK', psk)
    }

    this.#client = ofetch.create({ baseURL: host, headers })
  }

  invoke({ id = 1, endpoint, method, version = '1.0', params = [''] }: InvokeOptions) {
    return this.#client<InvokeResult>(endpoint, {
      method: 'POST',
      body: { id, method, version, params },
    })
  }
}
