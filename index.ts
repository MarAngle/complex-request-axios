import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BaseRequest, Rule } from 'complex-request'
import { RequestConfig } from 'complex-request/src/BaseRequest'

class AxiosRequest<R extends AxiosResponse = AxiosResponse, L extends AxiosRequestConfig = AxiosRequestConfig> extends BaseRequest<R, L>{
  $request(requestConfig: RequestConfig<R, L>, rule?: Rule<R, L>, isRefresh?: boolean) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: requestConfig.url,
      method: requestConfig.method,
      headers: requestConfig.headers,
      data: requestConfig.data,
      params: requestConfig.params,
      responseType: requestConfig.responseType,
      ...requestConfig.local
    }
    if (requestConfig.format) {
      requestConfig.format(axiosRequestConfig, rule, isRefresh)
    }
    return axios(axiosRequestConfig) as Promise<R>
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
