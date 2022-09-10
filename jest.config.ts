import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  transform: { '^.+\\.ts?$': ['@swc/jest'] },
};
