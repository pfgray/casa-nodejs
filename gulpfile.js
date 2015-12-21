var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    util = require('gulp-util'),
    jade = require('gulp-jade');
    /*
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev');
    */

var path = require('path');

var client = './client';

gulp.task('default', function() {
  // place code for your default task here

  gulp.run('styles', 'templates');

  //build styles,
  //build templates,

  //start the server,
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
