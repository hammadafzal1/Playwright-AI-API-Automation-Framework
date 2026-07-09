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
  async login(credentials: LoginRequest): Promise<ApiResponse> {
    return this.post('/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async signup(payload: SignupRequest): Promise<ApiResponse> {
    return this.post('/users/add', payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
