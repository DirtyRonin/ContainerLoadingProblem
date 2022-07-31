/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv:['@testing-library/jest-dom/extend-expect'],
  testEnvironment: "node",
  roots: ["<rootDir>/src/"],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  }
};