
var webpack = require('webpack'),
    path = require('path');

// PATHS
var PATHS = {
  app: __dirname + '/client',
  target: __dirname + '/dist'
};

module.exports = {
    resolve: {
      extensions: ['', '.js', '.ts', '.tsx'],
      alias: {}
    },
    node: {
      fs: "empty"
    },

    cache: false,
    debug: false,
    devtool: "#source-map",

    entry: {
        main: [PATHS.app + '/main.js']
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
        loader: 'babel?' + JSON.stringify({
          plugins: ['transform-runtime'],
          presets: ['react', 'es2015', 'stage-1']
        }),
        include: PATHS.app
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /(\.(eot.*|woff2?.*|ttf.*|svg.*)$|.(gif|png|jpg)$)/,
        loader: "url?limit=8192"
      },{
        test: /\.tsx?$/,
        loader: 'babel?' + JSON.stringify({
          plugins: ['transform-runtime'],
          presets: ['react', 'es2015', 'stage-1']
        }) + '!ts-loader',
        include: PATHS.app,
        exclude: /node_modules/,
      }]
    },

    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          drop_console: true
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en$/),
      new webpack.NoErrorsPlugin({
        bail: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      })
    ]
};
