import { describe, it, expect, vi } from 'vitest';
import { AxiosRequest } from './index';
import { Rule } from 'complex-request';
import axios, { AxiosResponse } from 'axios';

// Mock the axios create method
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      request: vi.fn(),
    })),
  },
}));

describe('AxiosRequest', () => {
  const mockRule = new Rule<AxiosResponse>({
    prop: 'test',
    parse: () => ({ status: 'success', data: {} }),
    login: () => Promise.resolve(),
    refresh: () => Promise.resolve(),
  });

  it('should be instantiated and create an axios instance', () => {
    const request = new AxiosRequest({
      rule: mockRule,
      axios: { timeout: 1000 },
    });

    expect(request).toBeInstanceOf(AxiosRequest);
    expect(axios.create).toHaveBeenCalledWith({ timeout: 1000 });
    expect(request.$axios).toBeDefined();
  });

  it('should call axios.request when $request is invoked', async () => {
    const request = new AxiosRequest({ rule: mockRule });
    const mockConfig = {
      url: '/test',
      method: 'get',
      headers: {},
      data: {},
      params: {},
    };

    // We cast to `any` because we are testing a protected member
    await (request as any).$request(mockConfig);

    expect(request.$axios.request).toHaveBeenCalledWith(mockConfig);
  });
});
