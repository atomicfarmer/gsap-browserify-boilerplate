var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require("gulp-uglify");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var autoPrefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

gulp.task('server', function () {
  connect.server({
	root: './',
	port: 3000,
	livereload: true
  });
});

gulp.task('scripts', function (){
	browserify('./js/main.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(streamify(uglify({
			mangle: false
		})))
		.pipe(rename("main.min.js"))
		.pipe(gulp.dest('./js'))
});

gulp.task("styles", function () {
	gulp.src("css/src/*.scss")
		.pipe(sass())
		.pipe(autoPrefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat("main.min.css"))
		.pipe(cssnano())
		.pipe(gulp.dest("./css"));
});

gulp.task('watch', function () {
	gulp.watch("css/src/*.scss", ["styles"]);
	gulp.watch(["./js/**/*.js", "!./js/vendor/*.js", "!./js/*.min.*"], ["scripts"]);
});

gulp.task('default', ['server', 'watch']);