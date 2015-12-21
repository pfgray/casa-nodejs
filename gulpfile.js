var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    util = require('gulp-util');

var path = require('path');

var client = './client';

gulp.task('default', function() {
  // place code for your default task here

});


gulp.task('styles', function(){
  console.log('hmm...')
  return gulp.src('./client/app/app.less')
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
