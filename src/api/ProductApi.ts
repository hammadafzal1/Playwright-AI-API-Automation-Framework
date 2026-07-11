import { BaseApi, type ApiResponse } from './BaseApi';

export class ProductApi extends BaseApi {
  async getProducts(): Promise<ApiResponse> {
    return this.get('/products');
  }

  async getProductById(id: number): Promise<ApiResponse> {
    return this.get(`/products/${id}`);
  }

  async searchProducts(keyword: string): Promise<ApiResponse> {
    return this.get(`/products/search?q=${encodeURIComponent(keyword)}`);
  }
}
