const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
/* eslint-enable import/no-extraneous-dependencies */

const serverConfig = {
  mode: 'development',
  stats: 'normal',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server.blop',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
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
              strictness: 'perfect',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({
      SERVER: true,
    }),
  ],
};

module.exports = serverConfig;
