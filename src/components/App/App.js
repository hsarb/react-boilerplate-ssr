// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppFrame from '../AppFrame';
import Helmet from 'react-helmet';
import Reboot from 'material-ui/Reboot';
import routes from '../../routes';

type Props = {
  data: Object,
};

function App(props: Props) {
  const { data } = props;

  return (
    <AppFrame>
      <Reboot />
      <Helmet title="React-Boilerplate-SSR" />
      <Switch>
        {routes.map(({ component: Component, ...route }) => (
          <Route
            {...route}
            key={route.path}
            component={({ ...renderProps }) => <Component {...renderProps} {...data} />}
          />
        ))}
      </Switch>
    </AppFrame>
  );
}

export default App;
