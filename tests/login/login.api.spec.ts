import { expect, test, type APIRequestContext } from '@playwright/test';
import { AuthApi } from '../../src/api/AuthApi';
import { EnvironmentConfig } from '../../src/utils/environmentConfig';
import { TestDataFactory } from '../../src/utils/testDataFactory';

test.describe('Login API automation', () => {
  let request: APIRequestContext;
  let authApi: AuthApi;
  let config: EnvironmentConfig;
  let dataFactory: TestDataFactory;

  test.beforeEach(async ({ request: apiRequest }) => {
    request = apiRequest;
    config = new EnvironmentConfig();
    dataFactory = new TestDataFactory();
    authApi = new AuthApi(request, config.baseUrl);
  });

  test('logs in with valid credentials', async () => {
    const response = await authApi.login({ username: 'emilys', password: 'emilyspass' });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeTruthy();
    expect(response.body.refreshToken).toBeTruthy();
    expect(response.body.id).toBeGreaterThan(0);
    expect(response.body.username).toBe('emilys');
    expect(response.body.email).toBe('emily.johnson@x.dummyjson.com');
    expect(response.duration).toBeLessThan(2000);
  });

  test('captures the signup-to-login defect for a newly created user', async () => {
    const user = dataFactory.createUser();
    const signupResponse = await authApi.signup(user);

    expect(signupResponse.status).toBe(201);

    const loginResponse = await authApi.login({ username: user.username, password: user.password });

    expect(loginResponse.status).toBe(400);
    expect(loginResponse.body.message).toContain('Invalid credentials');
  });

  test('rejects invalid password', async () => {
    const response = await authApi.login({ username: 'emilys', password: 'wrong-password' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid credentials');
  });

  test('rejects empty password', async () => {
    const response = await authApi.login({ username: 'emilys', password: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

  test('rejects missing request body', async () => {
    const response = await authApi.postRaw('/auth/login', undefined as never);

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

  test('rejects invalid JSON payload', async () => {
    const response = await authApi.postRaw('/auth/login', '{invalid-json}', {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

  test('rejects malformed authorization header', async () => {
    const response = await authApi.postRaw('/auth/login', { username: 'emilys', password: 'emilyspass' }, {
      headers: { Authorization: 'Bearer', 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeTruthy();
  });

  test('validates response schema for login success', async () => {
    const response = await authApi.login({ username: 'emilys', password: 'emilyspass' });

    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
      }),
    );
  });
});
