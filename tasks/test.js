var gulp = require('gulp');
var karma = require('karma');
var sequence = require('gulp-sequence');

var pathUtil = require('./utils/path.util');
var Server = karma.Server;

gulp.task('test', sequence(['test:unit'], ['test:e2e']));

gulp.task('test:unit', function(done) {
  new Server({
    configFile: pathUtil.resolve('tasks/config') + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:e2e', function() {

});