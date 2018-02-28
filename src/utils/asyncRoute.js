// @flow
import * as React from 'react';

type State = {
  client: boolean,
  Component: React.Node,
};

export default (asyncRoute: Function) =>
  class AsyncRoute extends React.PureComponent<any, State> {
    static Component = null;

    static async getInitialProps(ctx: Object) {
      let componentProps = {};

      const { default: Component } = await asyncRoute();

      if (Component.getInitialProps) {
        componentProps = await Component.getInitialProps(ctx);
      }

      return {
        ...componentProps,
      };
    }

    state = { client: false, Component: AsyncRoute.Component };

    async componentWillMount() {
      if (this.state.Component) return;

      const { default: Component } = await asyncRoute();

      if (this.mounted) this.setState({ Component });
    }

    componentDidMount() {
      this.mounted = true;

      this.setState({ client: true });
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    mounted = false;

    render() {
      const { Component, client } = this.state;

      if (Component && client) return <Component {...this.props} />;

      return null;
    }
  };
