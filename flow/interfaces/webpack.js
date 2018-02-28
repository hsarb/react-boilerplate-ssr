/* @flow */

// Hot module definition
declare var module: {
  hot: {
    accept(path: string, callback: () => any): void,
  },
};
