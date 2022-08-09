import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ListResponse<Type> {
  data: {
    data: Type[]
    total: number
  }
  error_message?: {
    detail?: any
    message: string
  }
  result_code: string
}

export interface Response<Type> {
  data: Type
  error_message?: {
    detail?: any
    message: string
  }
  result_code: string
}

export interface ResponseError<T = any, D = any> {
  message?: string
  code?: string
  config?: AxiosRequestConfig<D>
  request?: any
  response?: AxiosResponse<T, D>
}
