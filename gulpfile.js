var gulp          = require('gulp');
var del           = require('del');
var sass          = require('gulp-sass');
var merge         = require('merge-stream');
var plumber       = require('gulp-plumber');
var runSequence   = require('run-sequence').use(gulp);
var autoprefixer  = require('gulp-autoprefixer');


var config = require('./gulpconfig.json');

var onError = function () {console.log('fail')};

gulp.task('clean', function() {
  return del([config.paths.dist + '**']);
});

gulp.task('copy', function() {

  var index = gulp.src(config.globs.index, {cwd: config.paths.src})
    .pipe(gulp.dest(config.paths.dist))

  var assets = gulp.src(config.globs.assets, {cwd: config.paths.src})
    .pipe(gulp.dest(config.paths.dist + 'assets'))

  return merge(index, assets);
});

gulp.task('sass', function() {
  return gulp.src(config.globs.sass, {cwd: config.paths.src})
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.paths.dist + 'css'));
});

gulp.task('default', ['build']);

gulp.task('build', function () {
  runSequence('clean', 'sass', 'copy');
});

gulp.task('watch', function() {
  gulp.watch(config.paths.src + '*', ['build']);
});