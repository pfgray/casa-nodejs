var gulp = require('gulp');

var server = require('gulp-express');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var distWebpackConfig = require('./webpack.dist.config.js');

gulp.task('serve', function(){
  server.run(['server/server.js']);

  gulp.watch(['server/**/*.js'], function(event){
    server.stop();
    server.run(['server/server.js']);
  });
});

gulp.task('build', function(){

  //Client app build
  gulp.src('client/app/app.js')
    .pipe(gulpWebpack(distWebpackConfig, webpack))
    .pipe(gulp.dest('dist/public/assets'));

  //server app
  gulp.src('server/**/*')
    .pipe(gulp.dest('dist/server/'));
});
