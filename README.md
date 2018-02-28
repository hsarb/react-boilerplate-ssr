## React Boilerplate

A minimal library boilerplate for building [React](https://reactjs.org/) (16.2.0) applications with flow, eslint and jest leveraging Server Side Rendering.

## Getting Started

Make sure you have [Node](https://nodejs.org/en/) (8.9.4) and [Yarn](https://yarnpkg.com/en/) installed before attempting the following steps.

1. Clone the repo

```
$ git clone --origin react-boilerplate-ssr --branch master git@github.com:hsarb/react-boilerplate-ssr.git yourAppName
$ cd yourAppName
```

2. Install dependencies

```
$ yarn
```

3. Profit

### Updating the boilerplate in your repo

Make sure you are on the branch you want to be updated with the latest boilerplate code

```
$ git fetch react-boilerplate-ssr
$ git merge react-boilerplate-ssr/master
```

### Setting up a development environment

Start a pre-configured development server

```
$ yarn dev
```

### Building the production code

Compile code into minified javascript

```
$ yarn build
```

Start the production server

```
$ yarn start
```

### Deploying the application

TBD

### Testing

There are both unit tests and integration tests. We are using [Jest](https://github.com/facebook/jest) with [Enyzme](https://github.com/airbnb/enzyme) for our testing and assertions library. [Puppeteer](https://github.com/GoogleChrome/puppeteer) is used as a headless browser for integration tests.

**Running Unit Tests**

```
$ yarn test:unit
```

**Writing Unit Tests**

We prefer to use snapshot testing for unit tests, as it minimizes the number of presentational tests that need to be written. These snapshot tests take a code snapshot of the render markup and compares a current version to the last version to ensure no breaking changes were introduced.

```
import App from './App';
import React from 'react';
import renderer from 'react-test-renderer';

describe('App', () => {
  it('should render correctly', () => {
    const props = {};

    const wrapper = renderer.create(<App {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
```

**Running Integration Tests**

Make sure that you have an instance of the development environment up and running before running integrations. Or else they will fail.

```
$ yarn test:integration
```

**Writing Integration Tests**

Writing integration tests can be a bit more cumbersome than unit tests. We need to instantiate a new page instance before all the tests for a given run. We can then navigate to the page needed for testing. After that you can use [puppeteer](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) events / methods to access page elements, [jest](https://facebook.github.io/jest/docs/en/using-matchers.html) matchers can then be used to determine if the test passed.

```
describe('App', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();

    await page.goto(`http://www.google.com`);
  });

  afterAll(async () => {
    await page.close();
  });

  it('should load without error', async () => {
    const text = await page.evaluate(() => document.body.textContent);

    expect(text).toContain('google');
  });
});
```

**Running both Test Suites**

```
$ yarn test
```

### Linting

We follow the [Airbnb](https://github.com/airbnb/javascript) styleguide for javascript.

```
$ yarn lint
```

### Flow

We leverage [Flow](https://flow.org/) for type checking our javascript code. This is ran as a process when you commit. If flow fails, your commit will fail. Same goes for linting. If you need to add a third party library that was not written using flow, make sure you check to see if an interface is available using [flow-typed](https://github.com/flowtype/flow-typed).

### Using the boilerplate

We have separated concerns for the the application into three main sections: Components, Views and Utils

- **Components** are reusabled blocks of code, that are resposible for managing their own view state (not data state). Data should be passed into these components via props.
- **Views** are data managers for a given view in the application. They are responsible for requesting and updating the data needed for children Components.
- **Utils** common javascript code that can be used throughout the app.

**Making requests / prop assignments in views**

You can fetch data, attach the response as props or pre assign props to a view using the `asynRoute` HOC. This HOC will look for the `getInitalProps` static method that you can attach to a react class and execute it within the HOC's component lifecycle.

```
static async getInitialProps() {
  const call = await fetch('http://localhost:3000/api');
  const { message } = await call.json();

  return { message };
}
```

The return of this method will be assigned as props to the component calling this method, it will also bind a loading prop to the component as well, and will resolve with the fetch promise.

```
class App extends Component {
  static async getInitialProps() {
    const call = await fetch('http://localhost:3000/api');
    const { message } = await call.json();

    return { message };
  }

  render() {
    const { message } = this.props;

    return (
      <div>{ message }</div>
    );
  }
}
```

```
import asyncRoute from './utils/asyncRoute';

export default [
  {
    path: '/',
    component: asyncRoute(() => import(/* webpackChunkName: "home" */ './views/Home')),
    exact: true,
  },
];
```

**Styling**

We use [Material-ui](https://material-ui-next.com/) as our component / theming framework. This framework utilizes [JSS](https://github.com/cssinjs/jss) as a css in js rendering engine.

This engine, when used with the [withStyles-hoc](https://material-ui-next.com/customization/css-in-js/#withstyles-styles-options-higher-order-component) will attach a classes prop to your component. You can then access classes keys and attach them to dom components.

```
import React from 'react';
import withStyles from 'material-ui/syles/withStyles';

const styles = {
  root: {
    margin: 1000,
  },
};

function MyComponent(props) {
  const { classes } = this.props;

  return (
    <div className={classes.root} />
  );
}

export default withStyles(styles)(MyComponent);
```

**Managing State**

We have made the choice to not roll with a state management system as we feel we can achieve the same level of control using pre-fetching and a top down approach to react parent - child relationships. Data fetching and data flow should be controlled by the view and passed down to its children. Any method needed to manipulate this data should also be passed down to the child component. See the [react state guide](https://reactjs.org/docs/state-and-lifecycle.html) for more details

**Writing components**

Components should be limited in scope and responsible for its own view state. View state != data state. The parent should be responsible for getting the data where it needs to go.

For a more in depth look into writing components please see the [react component guide](https://reactjs.org/docs/components-and-props.html). Airbnb also provides a [style guide](https://github.com/airbnb/javascript/tree/master/react#class-vs-reactcreateclass-vs-stateless) for writing react components
