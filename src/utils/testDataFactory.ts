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

  constructor(private readonly environmentConfig: EnvironmentConfig = new EnvironmentConfig()) {
    this.testDataFile = path.resolve(__dirname, '../../', this.environmentConfig.testDataFile);
  }

  private readTestData(): any {
    const raw = fs.readFileSync(this.testDataFile, 'utf8');
    return JSON.parse(raw);
  }

  getAuthenticationData(): any {
    return this.readTestData().authentication;
  }

  getValidUser(): any {
    return this.getAuthenticationData().validUser;
  }

  getInvalidUser(): any {
    return this.getAuthenticationData().invalidUser;
  }

  getInvalidPasswordUser(): any {
    return this.getAuthenticationData().invalidPassword;
  }

  getInvalidUsernameUser(): any {
    return this.getAuthenticationData().invalidUsername;
  }

  getBoundaryData(): any {
    return this.readTestData().boundaryData;
  }

  getSecurityData(): any {
    return this.readTestData().securityTests;
  }

  getPerformanceThreshold(): number {
    return this.readTestData().performance.maxResponseTime;
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
