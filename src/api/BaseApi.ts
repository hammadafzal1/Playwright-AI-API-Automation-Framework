import { APIRequestContext, APIResponse } from '@playwright/test';

export interface ApiResponse<TBody = any> {
  status: number;
  body: TBody;
  duration: number;
  headers: Record<string, string>;
}

export class BaseApi {
  constructor(protected request: APIRequestContext, protected baseUrl: string) {}

  protected async send<TBody = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    data?: unknown,
    options?: { headers?: Record<string, string> },
  ): Promise<ApiResponse<TBody>> {
    const start = Date.now();
    const response = await this.request.fetch(`${this.baseUrl}${path}`, {
      method,
      data,
      headers: {
        Accept: 'application/json',
        ...options?.headers,
      },
    });

    const body = await response.json().catch(() => ({}));
    const headers = response.headers() as Record<string, string>;

    return {
      status: response.status(),
      body,
      duration: Date.now() - start,
      headers,
    };
  }

  async get<TBody = any>(path: string, options?: { headers?: Record<string, string> }): Promise<ApiResponse<TBody>> {
    return this.send<TBody>('GET', path, undefined, options);
  }

  async post<TBody = any>(path: string, data?: unknown, options?: { headers?: Record<string, string> }): Promise<ApiResponse<TBody>> {
    return this.send<TBody>('POST', path, data, options);
  }

  async postRaw<TBody = any>(path: string, data?: unknown, options?: { headers?: Record<string, string> }): Promise<ApiResponse<TBody>> {
    const start = Date.now();
    const response = await this.request.fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      data,
      headers: {
        Accept: 'application/json',
        ...options?.headers,
      },
    });

    let body: any = {};
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    const headers = response.headers() as Record<string, string>;

    return {
      status: response.status(),
      body,
      duration: Date.now() - start,
      headers,
    };
  }
}
