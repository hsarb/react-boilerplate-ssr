// @flow
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Helmet from 'react-helmet';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 400,
  },
};

type Props = {
  classes: Object,
  message: ?string,
};

class Home extends Component<Props> {
  static async getInitialProps() {
    const call = await fetch('http://localhost:3000/api');
    const { message } = await call.json();

    return { message };
  }

  render() {
    const { classes, message } = this.props;

    return (
      <div className={classes.root}>
        <Helmet title="Welcome" />
        <Typography variant="display1">{message}</Typography>
        <Typography variant="title">
          A minimal library React boilerplate built with performance, testing, and ease of use in
          mind.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
