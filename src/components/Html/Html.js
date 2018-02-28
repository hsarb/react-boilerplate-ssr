/* eslint-disable no-inline-comments */
/* eslint-disable react/no-danger */
// @flow
import * as React from 'react';
import Helmet from 'react-helmet';

const isProd = process.env.NODE_ENV === 'production';
let manifests: { 'vendor.js': string, 'client.js': string } = {
  'vendor.js': '/static/vendor.js',
  'client.js': '/static/client.js',
};

// $FlowExpectedError
if (isProd) manifests = import('../build/assets.json');

const loadScripts = () => {
  const paths = [manifests['vendor.js'], manifests['client.js']];

  return paths.map(path => <script key={path} type="text/javascript" src={path} />);
};

type Props = {
  component: React.Node,
  css: string,
  data: Object,
};

function Html(props: Props) {
  const { component, css, data } = props;
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();

  return (
    // $FlowExpectedError
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: component }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: ` window.__intialState__=${JSON.stringify(data)};`,
          }}
          charSet="UTF-8"
        />
        <style id="jss-server-side">{css}</style>
        {loadScripts()}
      </body>
    </html>
  );
}

export default Html;

/* eslint-enable no-inline-comments */
/* eslint-enable react/no-danger */
