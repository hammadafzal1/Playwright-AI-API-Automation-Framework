import { v4 as uuid } from 'uuid';

export interface GeneratedUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export class TestDataFactory {
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
