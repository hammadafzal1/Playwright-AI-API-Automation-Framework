import * as fs from 'fs';
import * as path from 'path';

export class EnvironmentConfig {
  readonly baseUrl: string;
  readonly environment: string;
  readonly reportFolder: string;
  readonly testFolder: string;
  readonly testDataFile: string;
  readonly activeProject: string;

  constructor(configFilePath = path.resolve(__dirname, '../../config/project.config.json')) {
    const raw = fs.readFileSync(configFilePath, 'utf8');
    const config = JSON.parse(raw);
    const projectConfig = config.project ?? {};
    const activeProject = projectConfig.name ?? 'DummyJSON';

    this.activeProject = activeProject;
    this.baseUrl = projectConfig.baseUrl ?? config.baseUrl ?? 'https://dummyjson.com';
    this.environment = config.environment ?? 'QA';
    this.reportFolder = config.reportFolder ?? config.testReportFolder ?? 'reports';
    this.testFolder = config.testFolder ?? config.playwrightTestFolder ?? 'tests';
    this.testDataFile = projectConfig.input?.testData ?? 'input/dummyjson/testdata.json';
  }
}
