const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
  },
};

const entries = ['./src/client.blop'];

if (!process.env.DISTRIBUTE) {
  entries.push('webpack-hot-middleware/client');
}


const clientConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: 'normal',
  target: 'web',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.blop$/,
        use: [
          {
            loader: 'blop-language/src/loader',
            options: {
              debug: !!process.env.BLOP_DEBUG,
              sourceMap: true,
              strictness: 'perfect',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', CSSModuleLoader],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', CSSModuleLoader, 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({
      SERVER: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

module.exports = clientConfig;
