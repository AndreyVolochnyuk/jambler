
'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 15 versions'],
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
});