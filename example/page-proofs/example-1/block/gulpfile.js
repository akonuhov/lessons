var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	jade = require('gulp-jade'),
	stylint = require('gulp-stylint'),
	autoprefixer = require('autoprefixer-stylus'),
	browserSync = require('browser-sync').create(),
	runSequence = require('run-sequence'),
	watch = require('gulp-watch'),
	changed = require('gulp-changed');

gulp.task('stylus', function() {
	return gulp.src('app/style/*.styl')
		.pipe(stylus({
			use: [
				autoprefixer()
			]
		}))
		.pipe(gulp.dest('dist/assets/style'));
});

gulp.task('stylus:lint', ['stylus'], function() {
	return gulp.src(['app/**/*.styl', '!app/styles/**'])
		.pipe(stylint())
		.pipe(stylint.reporter())
});

gulp.task('jade', function () {
	return gulp.src('app/index.jade')
		.pipe(jade({
			basedir: 'app'
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('copy', () => (
	gulp.src('app/assets/**/*')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/assets'))
));

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
	gulp.watch
});

gulp.task('build', function() {
	gulp.start(
		'stylus',
		'jade',
		'copy'
	)
});

gulp.task('watch', function() {
    watch(['app/style/style.styl'], function() {
    	runSequence(['stylus', 'stylus:lint'], function() {
    		browserSync.reload('dist/resource/style/style.css');
    	})
    });
    watch(['./app/index.jade'], function() {
    	runSequence('jade', browserSync.reload);
    });
});

gulp.task('default', function() {
	runSequence(
		[
			'stylus',
			'jade'
		],
		'build',
		'server',
		'watch'
	)
});