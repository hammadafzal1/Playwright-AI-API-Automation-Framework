import { expect, test, type APIRequestContext } from '@playwright/test';
import { AuthApi } from '../../src/api/AuthApi';
import { ProductApi } from '../../src/api/ProductApi';
import { TodoApi } from '../../src/api/TodoApi';
import { UserApi } from '../../src/api/UserApi';
import { EnvironmentConfig } from '../../src/utils/environmentConfig';
import { TestDataFactory } from '../../src/utils/testDataFactory';

test.describe('DummyJSON API automation', () => {
  let request: APIRequestContext;
  let authApi: AuthApi;
  let userApi: UserApi;
  let todoApi: TodoApi;
  let productApi: ProductApi;
  let config: EnvironmentConfig;
  let dataFactory: TestDataFactory;

  test.beforeEach(async ({ request: apiRequest }) => {
    request = apiRequest;
    config = new EnvironmentConfig();
    dataFactory = new TestDataFactory();
    authApi = new AuthApi(request, config.baseUrl);
    userApi = new UserApi(request, config.baseUrl);
    todoApi = new TodoApi(request, config.baseUrl);
    productApi = new ProductApi(request, config.baseUrl);
  });

  test('authenticates successfully and reuses the captured token', async () => {
    const credentials = dataFactory.getValidUser();
    const loginResponse = await authApi.login(credentials);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.accessToken).toBeTruthy();
    expect(loginResponse.body.refreshToken).toBeTruthy();
    expect(loginResponse.body.username).toBe(credentials.username);
    expect(loginResponse.duration).toBeLessThan(dataFactory.getPerformanceThreshold());

    const profileResponse = await authApi.getCurrentUser();

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.username).toBe(credentials.username);
    expect(profileResponse.body.email).toBeTruthy();
  });

  test('rejects invalid credentials with a clear error response', async () => {
    const credentials = dataFactory.getInvalidUser();
    const response = await authApi.login(credentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid credentials');
    expect(response.duration).toBeLessThan(dataFactory.getPerformanceThreshold());
  });

  test('retrieves users and searches for a known user', async () => {
    const usersResponse = await userApi.getUsers();
    const searchResponse = await userApi.searchUsers(dataFactory.getUsersData().searchKeyword ?? 'Emily');

    expect(usersResponse.status).toBe(200);
    expect(Array.isArray(usersResponse.body.users)).toBeTruthy();
    expect(usersResponse.body.users.length).toBeGreaterThan(0);

    expect(searchResponse.status).toBe(200);
    expect(Array.isArray(searchResponse.body.users)).toBeTruthy();
    expect(searchResponse.body.users.length).toBeGreaterThan(0);
  });

  test('returns not found for an invalid user id', async () => {
    const response = await userApi.getUserById(dataFactory.getUsersData().invalidUserId ?? 99999);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeTruthy();
  });

  test('creates a todo and reports unsupported update/delete behavior', async () => {
    const createResponse = await todoApi.createTodo(dataFactory.getTodosData().newTodo);
    expect(createResponse.status).toBe(201);
    expect(createResponse.body.id).toBeTruthy();

    const updateResponse = await todoApi.updateTodo(createResponse.body.id, dataFactory.getTodosData().updateTodo);
    expect(updateResponse.status).toBe(404);
    expect(updateResponse.body.message).toContain('Todo with id');

    const deleteResponse = await todoApi.deleteTodo(createResponse.body.id);
    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body.message).toContain('Todo with id');
  });

  test('retrieves and searches products successfully', async () => {
    const productsResponse = await productApi.getProducts();
    const productResponse = await productApi.getProductById(dataFactory.getProductsData().validProductId ?? 1);
    const searchResponse = await productApi.searchProducts(dataFactory.getProductsData().searchKeyword ?? 'phone');

    expect(productsResponse.status).toBe(200);
    expect(Array.isArray(productsResponse.body.products)).toBeTruthy();
    expect(productResponse.status).toBe(200);
    expect(productResponse.body.id).toBe(dataFactory.getProductsData().validProductId ?? 1);
    expect(searchResponse.status).toBe(200);
    expect(Array.isArray(searchResponse.body.products)).toBeTruthy();
  });

  test('returns not found for an invalid product id', async () => {
    const response = await productApi.getProductById(dataFactory.getProductsData().invalidProductId ?? 99999);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeTruthy();
  });

  test('keeps API responses within the configured performance threshold', async () => {
    const response = await productApi.getProducts();

    expect(response.status).toBe(200);
    expect(response.duration).toBeLessThan(dataFactory.getPerformanceThreshold());
  });
});
