var webpack = require('webpack');
var path = require('path');
var envFile = require('dotenv').config(); //eslint-disable-line

module.exports = {
  // the entry file for the bundle
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js'
  ],
  externals: {
    jquery: 'jQuery',
    foundation: 'Foundation'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      output: {
            comments: false,
          },
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        DB_HOST: JSON.stringify(process.env.DB_HOST),
        DB_USER: JSON.stringify(process.env.DB_USER),
        DB_PASS: JSON.stringify(process.env.DB_PASS),
        JWT_SECRET: JSON.stringify(process.env.JWT_SECRET)
      }
    })
  ],
  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules'],
    alias: {
      app: 'app',
      applicationStyles: 'client/src/styles/app.scss',
      configureStore: 'client/src/store/configureStore.jsx'
    },
    extensions: ['.js', '.jsx']
  },

  module: {

    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', ['es2015', { 'modules': false }], 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 250000000,
        },
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};
