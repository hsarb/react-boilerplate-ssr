// @flow
// $FlowIssue renderToNodeStream not typed
import { renderToNodeStream, renderToString } from 'react-dom/server';
import App from './components/App';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import Html from './components/Html';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from 'material-ui/styles';
import prepareRoutes from './utils/prepareRoutes';
import React from 'react';
import routes from './routes';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { StaticRouter } from 'react-router-dom';
import theme from './utils/theme';

export default () => async (req: Object, res: Object) => {
  const context: Object = {};
  const generateClassName = createGenerateClassName();
  const matches = await prepareRoutes(routes, req, res);
  const [data] = await Promise.all(matches);
  const sheetsRegistry = new SheetsRegistry();

  const app = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <StaticRouter location={req.url} context={context}>
          <App data={data} />
        </StaticRouter>
      </MuiThemeProvider>
    </JssProvider>,
  );

  if (context.url) return res.redirect(302, context.url);

  const css = sheetsRegistry.toString();

  const html = renderToNodeStream(<Html component={app} css={css} data={data} />);

  res.status(200);
  res.type('html');
  res.write('<!doctype html>');

  return html.pipe(res);
};
