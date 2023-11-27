import axios from 'axios'
import { Request } from 'complex-request'
import { RequestConfig } from 'complex-request/src/Request'
import Rule from 'complex-request/src/Rule'

class AxiosRequest extends Request{
  $request(requestConfig: RequestConfig, rule?: Rule, isRefresh?: boolean) {
    return axios({
      url: requestConfig.url,
      method: requestConfig.method,
      headers: requestConfig.headers,
      data: requestConfig.data,
      params: requestConfig.params,
      responseType: requestConfig.responseType,
      ...requestConfig.local
    })
  }
  $parseError(responseError: { response?: { status: number } }) {
    if (responseError.response) {
      return this.status[responseError.response.status]
    } else {
      return ''
    }
  }
}

export {
  AxiosRequest
}
