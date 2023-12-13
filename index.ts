import axios, { AxiosRequestConfig } from 'axios'
import { BaseRequest } from 'complex-request'
import { RequestConfig } from 'complex-request/src/BaseRequest'
import Rule from 'complex-request/src/Rule'

class AxiosRequest extends BaseRequest{
  $request(requestConfig: RequestConfig, rule?: Rule, isRefresh?: boolean) {
    const axiosConfig: AxiosRequestConfig = {
      url: requestConfig.url,
      method: requestConfig.method,
      headers: requestConfig.headers,
      data: requestConfig.data,
      params: requestConfig.params,
      responseType: requestConfig.responseType,
      ...requestConfig.local
    }
    if (requestConfig.format) {
      requestConfig.format(axiosConfig, rule, isRefresh)
    }
    return axios(axiosConfig)
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
