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

  test('logs in with valid credentials from test data', async () => {
    const credentials = dataFactory.getValidUser();
    const response = await authApi.login(credentials);

    expect(response.status).toBe(201);
    expect(response.body.accessToken).toBeTruthy();
    expect(response.body.refreshToken).toBeTruthy();
    expect(response.body.id).toBeGreaterThan(0);
    expect(response.body.username).toBe(credentials.username);
    expect(response.body.email).toBeTruthy();
    expect(response.duration).toBeLessThan(dataFactory.getPerformanceThreshold());
  });

  test('reuses the captured token for a protected user endpoint', async () => {
    const credentials = dataFactory.getValidUser();
    const loginResponse = await authApi.login(credentials);

    expect(loginResponse.status).toBe(200);

    const profileResponse = await authApi.getCurrentUser();

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.username).toBe(credentials.username);
    expect(profileResponse.body.email).toBeTruthy();
  });

  test('rejects invalid credentials from test data', async () => {
    const credentials = dataFactory.getInvalidUser();
    const response = await authApi.login(credentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid credentials');
  });

  test('rejects invalid password from test data', async () => {
    const credentials = dataFactory.getInvalidPasswordUser();
    const response = await authApi.login(credentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid credentials');
  });

  test('rejects empty credentials from test data', async () => {
    const credentials = dataFactory.getAuthenticationData().emptyUser;
    const response = await authApi.login(credentials);

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
    const credentials = dataFactory.getValidUser();
    const response = await authApi.postRaw('/auth/login', credentials, {
      headers: { Authorization: 'Bearer', 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeTruthy();
  });

  test('rejects boundary credentials', async () => {
    const boundary = dataFactory.getBoundaryData();
    const response = await authApi.login({ username: boundary.longUsername, password: boundary.minimumPassword });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

  test('rejects injection payloads safely', async () => {
    const security = dataFactory.getSecurityData();
    const response = await authApi.login({ username: security.sqlInjection, password: security.xssInjection });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

  test('validates schema for login success', async () => {
    const credentials = dataFactory.getValidUser();
    const response = await authApi.login(credentials);

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
