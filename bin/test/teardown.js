/* eslint-disable no-console */
const chalk = require('chalk');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  console.log(chalk.blue(''));
  console.log(chalk.blue('[React-Boilerplate] Tearing down the puppeteer environment...'));

  await global.__BROWSER__.close();
  rimraf.sync(DIR);
};
/* eslint-enable no-console */
