// @flow
import asyncRoute from './utils/asyncRoute';

export default [
  {
    path: '/',
    component: asyncRoute(() => import(/* webpackChunkName: "home" */ './views/Home')),
    exact: true,
  },
];
