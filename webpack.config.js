
var webpack = require('webpack'),
    path = require('path');

// PATHS
var PATHS = {
  client: __dirname + '/client',
  login: __dirname + '/client/login',
  new: __dirname + '/client/new',
  app: __dirname + '/client/app',
  target: __dirname + '/dist'
};

module.exports = {
    resolve: {
      extensions: ['', '.js'],
      alias: {}
    },
    node: {
      fs: "empty"
    },

    debug: true,
    devtool: "#inline-source-map",

    entry: {
        main: [PATHS.app + '/app.js'],
        new: [PATHS.new + '/RootCasaApp.js'],
        login: [PATHS.login + '/LoginApp.js']
    },
    output: {
        path: PATHS.target,
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'ng-annotate!babel?' + JSON.stringify({
          plugins: ['transform-runtime'],
          presets: ['react', 'es2015', 'stage-1']
        }),
        include: PATHS.client
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /(\.(eot.*|woff2?.*|ttf.*|svg.*)$|.(gif|png|jpg)$)/,
        loader: "url?limit=8192"
      }, {
        test: /\.html$/,
        loader: "ngtemplate?relativeTo=" + __dirname + "!html"
      }, {
        test: /\.jade$/,
        loader: "jade"
      }, {
        test: /\.json$/,
        loader: "json"
      }]
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en$/)
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};