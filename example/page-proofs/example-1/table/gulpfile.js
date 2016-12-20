var gulp          = require('gulp'),
    stylus        = require('gulp-stylus'),
    jade          = require('gulp-jade');

gulp.task('jade:build', function () {
  return gulp.src('./app/templates/*')
  .pipe(jade({
      pretty: true
    }))
  .pipe(gulp.dest('./dist/'))
});

gulp.task('stylus:build', function () {
  return gulp.src('./app/stylus/styles.styl')
  .pipe(stylus())
  .pipe(gulp.dest('./dist/public/css/'))
});

gulp.task('watch', function () {
  gulp.watch('./app/stylus/**', ['stylus:build']);
  gulp.watch('./app/templates/**', ['jade:build']);
});

gulp.task('build', [
    'jade:build',
    'stylus:build'
]);

gulp.task('default', ['build', 'watch']);
