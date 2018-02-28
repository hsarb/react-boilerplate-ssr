/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  console.log(chalk.blue(''));
  console.log(chalk.blue('[React-Boilerplate] Setting up a puppeteer environment...'));
  console.log(chalk.blue(''));

  const browser = await puppeteer.launch();
  // store the browser instance so we can teardown it later
  global.__BROWSER__ = browser;

  // file the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};

/* eslint-enable no-console */
