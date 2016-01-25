'use strict';

var webpack = require('webpack'),
    path = require('path');

// PATHS
var PATHS = {
  app: __dirname + '/client/app',
  target: __dirname + '/dist'
};

module.exports = {
    resolve: {
      extensions: ['', '.js'],
      alias: {}
    },

    cache: true,
    debug: true,
    devtool: false,

    entry: {
        app: [PATHS.app + '/app.js']
    },
    output: {
        path: PATHS.target,
        filename: 'main.js',
        publicPath: '/assets/'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        include: PATHS.app,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-1'],
        }
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
      new webpack.NoErrorsPlugin()
    ]
};
