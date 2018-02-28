// @flow
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import theme from './utils/theme';

/* eslint-disable no-underscore-dangle */
const preloadedState = window.__intialState__;

delete window.__intialState__;
/* eslint-enable no-underscore-dangle */

const renderApp = () => {
  const rootElement = document.getElementById('root');

  // $FlowIssue
  ReactDOM.hydrate(
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App data={preloadedState} />
        </BrowserRouter>
      </MuiThemeProvider>
    </AppContainer>,
    rootElement,
  );
};

if (module.hot) module.hot.accept('./components/App', () => renderApp());

renderApp();
