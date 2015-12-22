var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    util = require('gulp-util'),
    jade = require('gulp-jade');

var clean = require('gulp-clean');
var wiredep = require('wiredep').stream;
var server = require('gulp-express');

var path = require('path');

var client = './client';

gulp.task('default', [
  'clean',
  'styles',
  'templates',
  'server'
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

gulp.task('server', function(){
  var serverEntry = 'server/app.js';

  server.run([serverEntry]);

  //watch server files
  gulp.watch(['server/**/*.js'], function(e){
    server.stop();
    server.run([serverEntry]);
  });

  //watch less files
  gulp.watch(['client/**/*.less'], function(){
    gulp.run('styles');
  });

  //watch jade files
  gulp.watch(['client/**/*.jade'], function(){
    gulp.run('templates');
  });
});
