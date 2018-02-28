// @flow
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import classnames from 'classnames';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const styles = ({ mixins, palette }: { mixins: Object, palette: Object }) => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  content: mixins.gutters({
    paddingTop: 80,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  header: {
    backgroundColor: palette.common.white,
    color: palette.text.primary,
  },
});

type Props = {
  children?: any,
  classes: Object,
  className?: string,
};

function AppFrame(props: Props) {
  const { children, classes, className: classNameProp, ...other } = props;
  const className = classnames(classes.root, classNameProp);

  return (
    <div className={className} {...other}>
      <AppBar className={classes.header}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            React Boilerplate
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default withStyles(styles)(AppFrame);
