/* eslint-disable no-console */
import bodyParser from 'body-parser';
import chalk from 'chalk';
import compression from 'compression';
import config from '../config';
import express from 'express';
import server from '../src/server.js';
import webpack from 'webpack';
import webpackClientConfig from '../config/webpack/webpack.client.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.disable('x-powered-by');

// This is just a dummy route for testing
app.get('/api', (req, res) => res.send({ message: 'React Boilerplate' }));

if (config.env === 'development') {
  console.log(chalk.blue('[React-Boilerplate] Setting up development server...'));

  const { output: { publicPath } } = webpackClientConfig;
  const webpackCompiler = webpack(webpackClientConfig);
  const middleware = webpackDevMiddleware(webpackCompiler, {
    logLevel: 'silent',
    publicPath,
  });
  const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
    reload: true,
  });

  app.use(middleware);
  app.use(hotMiddleware);

  {
    let isDone = false;

    webpackCompiler.plugin('done', () => {
      if (!isDone) {
        isDone = true;

        app.use(server());
      }
    });
  }
} else {
  console.log(chalk.blue('[React-Boilerplate] Setting up production server...'));

  const { output: { publicPath, path: outputPath } } = webpackClientConfig;

  app.use(publicPath, express.static(outputPath));
  app.use(server());
}

app.listen(config.port, () => {
  console.log(chalk.green('[React-Boilerplate] Server successfuly started at: '));
  console.log(chalk.green(`[React-Boilerplate] http://${config.host}:${config.port}`));
});
/* eslint-enable no-console */
