type DefaultParams = ['']

type Methods = {
  '/sony/system': {
    getCurrentTime: {
      result: [string]
    }
    getPowerStatus: {
      result: [{ status: 'standby' | 'active' }]
    }
    setPowerStatus: {
      params: [{ status: boolean }]
      result: [string]
    }
  }
}

export type Endpoint = keyof Methods

export type Method = keyof Methods[Endpoint]

export type Params<T extends Endpoint, U extends Method> = Methods[T][U] extends {
  params: infer P
}
  ? P
  : DefaultParams

export type Result<T extends Endpoint, U extends Method> = Methods[T][U]['result']

export type InvokeOptions<T extends Endpoint, U extends Method> = {
  id?: number
  endpoint: T
  method: U
  version?: string
  // If "params" is not provided, it will default to ['']
  // This makes it easier to call methods that don't require parameters without having explicit pass in [''] as the params
} & (Params<T, U> extends DefaultParams ? { params?: DefaultParams } : { params: Params<T, U> })

export type InvokeResult<T extends Endpoint, U extends Method> = {
  id: number
  result: Result<T, U>
}

export type ApiOptions = {
  host: string
  psk?: string
}
