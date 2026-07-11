import { BaseApi, type ApiResponse } from './BaseApi';

export class TodoApi extends BaseApi {
  async getTodos(): Promise<ApiResponse> {
    return this.get('/todos');
  }

  async createTodo(payload: Record<string, unknown>): Promise<ApiResponse> {
    return this.post('/todos/add', payload, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
  }

  async updateTodo(id: number, payload: Record<string, unknown>): Promise<ApiResponse> {
    return this.put(`/todos/${id}`, payload, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
  }

  async deleteTodo(id: number): Promise<ApiResponse> {
    return this.delete(`/todos/${id}`);
  }
}
