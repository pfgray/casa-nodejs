'use strict';

var webpack = require('webpack'),
    path = require('path');

// PATHS
var PATHS = {
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
        app: [PATHS.app + '/app.js']
    },
    output: {
        path: PATHS.target,
        filename: 'main.js',
        sourceMapFilename: "./bundle.js.map",
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
        include: PATHS.app
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
        test: /\.html$/,
        loader: "ngtemplate?relativeTo=" + __dirname + "!html"
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
