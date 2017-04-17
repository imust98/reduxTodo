var gulp = require('gulp');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

var es6Path = {
	src:['./app/*.js','./app/*/*.js'],
	dest:'dest'
}

gulp.task('babel',function () {
	return gulp.src(es6Path.src)
	.pipe(gulp.dest(es6Path.dest))
	.pipe(babel())
	.pipe(livereload());
});

gulp.task('watch',function(){
	gulp.watch(es6Path.src,['babel']);
  livereload.listen();
});

gulp.task('stream', function () {
  // Endless stream mode
  return watch('./app/**/*.html', { ignoreInitial: false })
    .pipe(gulp.dest(es6Path.dest));
});

gulp.task('default',['babel','watch','stream']);