export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^utility/(.*)$': '<rootDir>/src/utility/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^data/(.*)$': '<rootDir>/src/data/$1',
  },
}
