import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { EnvironmentConfig } from './environmentConfig';

export interface GeneratedUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export class TestDataFactory {
  private readonly testDataFile: string;
  private readonly testData: any;

  constructor(private readonly environmentConfig: EnvironmentConfig = new EnvironmentConfig()) {
    this.testDataFile = path.resolve(__dirname, '../../', this.environmentConfig.testDataFile);
    this.testData = this.readTestData();
  }

  private readTestData(): any {
    const raw = fs.readFileSync(this.testDataFile, 'utf8');
    return JSON.parse(raw);
  }

  getAuthenticationData(): any {
    return this.testData.authentication ?? {};
  }

  getValidUser(): any {
    return this.getAuthenticationData().validUser ?? this.testData.user;
  }

  getInvalidUser(): any {
    return this.getAuthenticationData().invalidUser;
  }

  getInvalidPasswordUser(): any {
    return this.getAuthenticationData().invalidPassword ?? {
      username: this.getValidUser().username,
      password: 'wrong-password',
    };
  }

  getInvalidUsernameUser(): any {
    return this.getAuthenticationData().invalidUsername ?? {
      username: 'invalid-user',
      password: this.getValidUser().password,
    };
  }

  getBoundaryData(): any {
    return {
      longUsername: 'a'.repeat(300),
      minimumPassword: 'x',
    };
  }

  getSecurityData(): any {
    return {
      sqlInjection: "' OR 1=1 --",
      xssInjection: '<script>alert(1)</script>',
    };
  }

  getUsersData(): any {
    return this.testData.users ?? {};
  }

  getTodosData(): any {
    return this.testData.todos ?? {};
  }

  getProductsData(): any {
    return this.testData.products ?? {};
  }

  getPerformanceThreshold(): number {
    return this.testData.performance?.maxResponseTime ?? 2000;
  }

  createUser(overrides: Partial<GeneratedUser> = {}): GeneratedUser {
    const suffix = uuid().slice(0, 8);
    return {
      firstName: overrides.firstName ?? 'Automation',
      lastName: overrides.lastName ?? 'User',
      username: overrides.username ?? `qa_${suffix}`,
      email: overrides.email ?? `qa_${suffix}@example.com`,
      password: overrides.password ?? `StrongPass123!${suffix}`,
      ...overrides,
    };
  }
}
