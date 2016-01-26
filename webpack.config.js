'use strict';

var webpack = require('webpack'),
    path = require('path');

// PATHS
var PATHS = {
  app: __dirname + '/client/app',
  target: __dirname + '/dist'
};

var babelSettings = {

}

module.exports = {
    resolve: {
      extensions: ['', '.js'],
      alias: {}
    },

    debug: true,
    devtool: "#inline-source-map",

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
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
};
