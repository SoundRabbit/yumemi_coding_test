import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['./jest.polyfills.js'],
};

export default createJestConfig(config);
