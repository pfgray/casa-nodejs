var gulp = require('gulp');

var server = require('gulp-express');

gulp.task('serve', function(){
  server.run(['server/server.js']);

  gulp.watch(['server/**/*.js'], function(event){
    server.stop();
    server.run(['server/server.js']);
  });
});
