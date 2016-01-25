var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    util = require('gulp-util'),
    jade = require('gulp-jade'),
    gutil = require('gulp-util');

var server = require('gulp-express');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


gulp.task('serve', function(){
  server.run(['server/app.js']);

  gulp.watch(['server/**/*.js'], function(event){
    server.stop();
    server.run(['server/app.js']);
  });

  webpackDevServer();
});

var webpackDevServer = function() {
  var myConfig = Object.create(webpackConfig);
  new WebpackDevServer(webpack(myConfig), {
  	publicPath: myConfig.output.publicPath,
  	stats: {
  		colors: true
  	},
    contentBase: 'client/',
    proxy: {
      '/api*': {
        target: 'http://localhost:9000',
        secure: false
      }
    }
  }).listen(9001, "localhost", function(err) {
  	if(err) throw new gutil.PluginError("webpack-dev-server", err);
  	gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
};

gulp.task('webpack-dev-server', webpackDevServer);
