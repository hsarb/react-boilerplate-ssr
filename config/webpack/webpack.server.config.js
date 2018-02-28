import config from '../../config';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

export default {
  context: config.paths.src,
  target: 'node',
  entry: {
    server: ['./server.js'],
  },
  externals: ['./assets.json', nodeExternals()],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    libraryTarget: 'commonjs2',
    path: config.paths.build,
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js'],
    modules: [config.paths.src, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 'current',
                    },
                    modules: false,
                    useBuiltIns: false,
                    debug: false,
                  },
                ],
                '@babel/preset-stage-0',
                '@babel/preset-flow',
                '@babel/preset-react',
              ],
            },
          },
        ],
        include: config.paths.src,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['file-loader?name=img/img-[hash:6].[ext]'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.ENV.BROWSER': false,
      ...config.globals,
    }),
  ],
};
