var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('test', sequence(['test:unit'], ['test:e2e']));

gulp.task('test:unit', function() {

});

gulp.task('test:e2e', function() {

});