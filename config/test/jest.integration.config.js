module.exports = {
  globalSetup: '../../bin/test/setup.js',
  globalTeardown: '../../bin/test/teardown.js',
  testEnvironment: '../../bin/test/puppeteer_environment.js',
  roots: ['../../integration'],
};
