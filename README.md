# Complex Request (Axios Adapter)

这是一个为 [`complex-request`](https://github.com/MarAngle/complex-request) 库设计的官方 `axios` 适配器。

它继承了 `complex-request` 的所有核心功能（如分层架构、强大的 Token 管理、自动化的登录/刷新流程等），并使用 `axios` 作为底层的 HTTP 请求客户端。

## 特性

- 继承 `complex-request` 的所有核心特性。
- 使用 `axios` 发送请求，您可以完全利用 `axios` 丰富的生态和功能。
- 允许在初始化时，传入 `axios` 的默认配置 (`CreateAxiosDefaults`)。
- 允许在每次请求时，传入特定于 `axios` 的配置 (`AxiosRequestConfig`)。

## 安装

```bash
npm install complex-request-axios axios complex-request
```

## 快速开始

这个库的使用方法与 `complex-request` 完全相同，您只需要将 `BaseRequest` 替换为 `AxiosRequest` 即可。

```typescript
import { AxiosRequest } from 'complex-request-axios';
import { Rule } from 'complex-request';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

// 1. 定义一套规则 (与 complex-request 完全相同)
const myRule = new Rule<AxiosResponse>({
  prop: 'api',
  token: {
    data: {
      accessToken: { location: 'header', require: true }
    }
  },
  parse: (response) => {
    const { data } = response;
    if (data.code === 200) {
      return { status: 'success', data: data.data };
    } else if (data.code === 401) {
      return { status: 'login', data: null, msg: '请先登录' };
    } else {
      return { status: 'fail', data: null, msg: data.message };
    }
  },
  login: () => {
    // ... 登录逻辑
  }
});

// 2. 实例化 AxiosRequest 对象
const myRequest = new AxiosRequest({
  baseUrl: 'https://api.example.com',
  rule: myRule,
  // 您可以在这里传入 axios 的默认配置
  axios: {
    timeout: 5000
  }
});

// 3. 发送请求
myRequest.get({
  url: '/user/profile',
  // 您可以在这里传入特定于 axios 的配置
  local: {
    onUploadProgress: (progressEvent) => {
      // ...
    }
  } as AxiosRequestConfig
})
  .then(response => {
    console.log('用户信息:', response.data);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });
```

## 依赖

- [`complex-request`](https://github.com/MarAngle/complex-request): 提供了核心的请求逻辑和规则引擎。
- [`axios`](https://github.com/axios/axios): 底层的 HTTP 请求客户端。
