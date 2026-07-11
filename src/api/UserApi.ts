import { BaseApi, type ApiResponse } from './BaseApi';

export class UserApi extends BaseApi {
  async getUsers(): Promise<ApiResponse> {
    return this.get('/users');
  }

  async getUserById(id: number): Promise<ApiResponse> {
    return this.get(`/users/${id}`);
  }

  async searchUsers(keyword: string): Promise<ApiResponse> {
    return this.get(`/users/search?q=${encodeURIComponent(keyword)}`);
  }
}
