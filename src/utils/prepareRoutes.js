// @flow
import { matchRoutes } from 'react-router-config';

export default (async function prepareRoutes(routes: Array<any>, req: any, res: any) {
  const matches = matchRoutes(routes, req.url);
  return matches.map(
    ({ route, match }) =>
      route.component.getInitialProps
        ? route.component.getInitialProps({ match, req, res })
        : Promise.resolve(null),
  );
});
