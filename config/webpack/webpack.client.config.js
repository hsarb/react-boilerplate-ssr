import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from '../../config';
import ManifestPlugin from 'webpack-manifest-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';

const isDev = config.env === 'development';

export default {
  name: 'client',
  context: config.paths.src,
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  entry: {
    client: isDev
      ? ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', './client.js']
      : ['./client.js'],
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
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
                isDev ? ['@babel/preset-react', { development: true }] : '@babel/preset-react',
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
      'process.ENV.BROWSER': true,
      ...config.globals,
    }), // defined our globals
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      openAnalyzer: false,
      logLevel: 'error',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
    isDev ? new webpack.NamedModulesPlugin() : null,
    isDev ? new webpack.HotModuleReplacementPlugin() : null,
    isDev ? new webpack.NoEmitOnErrorsPlugin() : null,
    !isDev
      ? new ManifestPlugin({
          path: config.paths.build,
          filename: 'assets.json',
        })
      : null,
    !isDev
      ? new UglifyJsPlugin({
          sourceMap: true,
          uglifyOptions: {
            output: {
              comments: false,
            },
            warnings: false,
          },
        })
      : null,
  ].filter(Boolean),
};
