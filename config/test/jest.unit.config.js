module.exports = {
  coverageReporters: ['text'],
  collectCoverageFrom: ['../../src/**/*.js'],
  globals: {
    document: true,
    window: true,
  },
  moduleDirectories: ['node_modules', 'src'],
  roots: ['../../src'],
  setupFiles: ['../../bin/test/browserMock.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};
