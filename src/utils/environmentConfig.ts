import * as fs from 'fs';
import * as path from 'path';

export class EnvironmentConfig {
  readonly baseUrl: string;
  readonly environment: string;
  readonly testReportFolder: string;

  constructor() {
    const configPath = path.resolve(__dirname, '../../config/project.config.json');
    const raw = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(raw);

    this.baseUrl = config.baseUrl ?? 'https://dummyjson.com';
    this.environment = config.environment ?? 'QA';
    this.testReportFolder = config.testReportFolder ?? 'reports';
  }
}
