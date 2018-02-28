import fs from 'fs-extra';
import path from 'path';

const NODE_ENV = JSON.stringify(process.env.NODE_ENV);
const projectRoot = fs.realpathSync(process.cwd());
const resolvePath = relative => path.resolve(projectRoot, relative);

export default {
  env: process.env.NODE_ENV || 'development',
  globals: {
    'process.env': { NODE_ENV },
  },
  host: process.env.HOST || 'localhost',
  paths: {
    client: resolvePath('client'),
    build: resolvePath('build'),
    nodeModules: resolvePath('node_modules'),
    root: resolvePath(''),
    server: resolvePath('server'),
    src: resolvePath('src'),
  },
  port: process.env.PORT || 3000,
};
