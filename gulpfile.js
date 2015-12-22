var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    util = require('gulp-util'),
    jade = require('gulp-jade');

var clean = require('gulp-clean');
var wiredep = require('wiredep').stream;
    /*
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev');
    */

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

/*
gulp.task('usemin', function() {
  return gulp.src(client + '/index.html')
    .pipe(usemin({
      css: [ rev() ],
      html: [ minifyHtml({ empty: true }) ],
      js: [ uglify(), rev() ],
      inlinejs: [ uglify() ],
      inlinecss: [ minifyCss(), 'concat' ]
    }))
    .pipe(gulp.dest('build/'));
});
*/
