
var webpack = require('webpack'),
    path = require('path');

// PATHS
var PATHS = {
  client: __dirname + '/client',
  login: __dirname + '/client/login',
  app: __dirname + '/client/app',
  target: __dirname + '/dist/assets'
};

module.exports = {
    resolve: {
      extensions: ['', '.js'],
      alias: {}
    },

    cache: false,
    debug: true,
    devtool: "#source-map",

    entry: {
        main: [PATHS.app + '/app.js'],
        new: [PATHS.new + '/main.js'],
        login: [PATHS.login + '/LoginApp.js']
    },
    output: {
        path: PATHS.target,
        filename: '[name].js',
        sourceMapFilename: "./[name].js.map",
        publicPath: '/assets/'
    },
    module: {
      preLoaders: [{
        test: '\\.js$',
        exclude: 'node_modules',
        loader: 'jshint'
      }],

      loaders: [{
        test: /\.js$/,
        loader: 'ng-annotate!babel?' + JSON.stringify({
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-1']
        }),
        include: PATHS.client
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      }, {
        test: /(\.(eot.*|woff.*|ttf.*|svg.*)$|.(gif)$)/,
        loader: "file"
      }, {
        test: /\.jade$/,
        loader: "jade"
      }]
    },

    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
};
