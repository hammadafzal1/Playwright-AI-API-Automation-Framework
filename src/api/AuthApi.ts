import { BaseApi, type ApiResponse } from './BaseApi';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export class AuthApi extends BaseApi {
  private accessToken?: string;
  private refreshToken?: string;

  private storeTokens(responseBody: any): void {
    if (responseBody && typeof responseBody === 'object') {
      if (typeof responseBody.accessToken === 'string') {
        this.accessToken = responseBody.accessToken;
      }
      if (typeof responseBody.refreshToken === 'string') {
        this.refreshToken = responseBody.refreshToken;
      }
    }
  }

  private buildAuthHeaders(extraHeaders?: Record<string, string>): Record<string, string> {
    return {
      Accept: 'application/json',
      ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}),
      ...extraHeaders,
    };
  }

  async login(credentials: LoginRequest): Promise<ApiResponse> {
    const response = await this.post('/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      this.storeTokens(response.body);
    }

    return response;
  }

  async signup(payload: SignupRequest): Promise<ApiResponse> {
    return this.post('/users/add', payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async getCurrentUser(): Promise<ApiResponse> {
    return this.get('/auth/me', {
      headers: this.buildAuthHeaders(),
    });
  }
}
