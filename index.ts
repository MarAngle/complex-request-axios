import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import { BaseRequest } from 'complex-request'
import { RequestConfig, RequestInitOption, requestTrigger } from 'complex-request/src/BaseRequest'

export interface AxiosRequestInitOption<R extends AxiosResponse = AxiosResponse, L extends AxiosRequestConfig = AxiosRequestConfig> extends RequestInitOption<R, L> {
  axios?: CreateAxiosDefaults
}

class AxiosRequest<R extends AxiosResponse = AxiosResponse, L extends AxiosRequestConfig = AxiosRequestConfig> extends BaseRequest<R, L>{
  $axios: AxiosInstance
  constructor(initOption: AxiosRequestInitOption<R, L>) {
    super(initOption)
    this.$axios = axios.create(initOption.axios)
  }
  $request(requestConfig: RequestConfig<R, L>, trigger?: requestTrigger) {
    const axiosRequestConfig = {
      url: requestConfig.url,
      method: requestConfig.method,
      headers: requestConfig.headers,
      data: requestConfig.data,
      params: requestConfig.params,
      responseType: requestConfig.responseType,
      ...requestConfig.local
    } as L
    if (requestConfig.format) {
      requestConfig.format(axiosRequestConfig, trigger)
    }
    return this.$axios.request(axiosRequestConfig) as Promise<R>
  }
  $parseError(responseError: { response?: { status: number } }) {
    if (responseError.response) {
      return {
        type: 'server',
        msg: this.status[responseError.response.status],
        data: responseError
      } as const
    } else {
      return {
        type: 'request',
        data: responseError
      } as const
    }
  }
}

export {
  AxiosRequest
}
