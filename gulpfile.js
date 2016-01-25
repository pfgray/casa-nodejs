var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    util = require('gulp-util'),
    jade = require('gulp-jade'),
    gutil = require('gulp-util');

var clean = require('gulp-clean');
var server = require('gulp-express');

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var path = require('path');
var client = './client';

gulp.task('default', [
  'clean',
  'styles',
  'templates'
], function() {
  // place code for your default task here

  //build styles,
  //build templates,

  //start the server,

    // 'wiredep',
    // 'express:dev',
    // 'wait',
    // 'watch'
});

gulp.task('styles', function(){
  return gulp.src(client + '/app/app.less')
    .pipe(less({
      paths: [
        client + '/bower_components',
        client + '/app',
        client + '/components'
      ]
    }).on('error', util.log))
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/app/'));
});

gulp.task('templates', function(){
  return gulp.src(client + '/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('clean', function () {
	return gulp.src('./tmp', {read: false})
		.pipe(clean());
});

gulp.task('bower', function () {
  return gulp.src(client + '/index.html')
    .pipe(wiredep({
      ignorePath: client + '/',
      exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
    }))
    .pipe(gulp.dest('./dest'));
});

gulp.task('serve', function(){
  server.run(['server/app.js']);

  gulp.watch(['client/**/*.jade'], function(){
    gulp.run('templates');
    server.notify();
  });
  gulp.watch(['client/**/*.js'], server.notify);
  gulp.watch(['client/**/*.less'], function(){
    gulp.run('styles');
    server.notify();
  });

  gulp.watch(['server/**/*.js'], function(event){
    server.stop();
    server.run(['server/app.js']);
  });

});

gulp.task("webpack-dev-server", function(callback) {

  var myConfig = Object.create(webpackConfig);

  new WebpackDevServer(webpack(myConfig), {
  	publicPath: myConfig.output.publicPath,
  	stats: {
  		colors: true
  	},
    contentBase:"client/"
  }).listen(8080, "localhost", function(err) {
  	if(err) throw new gutil.PluginError("webpack-dev-server", err);
  	gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});
