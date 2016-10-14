
'use strict';
 
var gulp           = require('gulp');
var sass           = require('gulp-sass');
var watch          = require('gulp-watch');
var sourcemaps     = require('gulp-sourcemaps');
var autoprefixer   = require('gulp-autoprefixer');
var browserSync    = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var gulpFilter     = require('gulp-filter'); 
var flatten        = require('gulp-flatten');
var imagemin       = require('gulp-imagemin');
var useref         = require('gulp-useref');
var uglify         = require('gulp-uglify');
var concat         = require('gulp-concat');
var cache          = require('gulp-cache');
var del            = require('del'); 
 
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 15 versions'],
        }))
    .pipe(sourcemaps.write())
    .pipe(browserSync.reload({
    	stream: true
    }))
    .pipe(gulp.dest('app/css'))
    
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('uglify', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/js/libs/jquery.js', // Берем jQuery
        'app/js/libs/slick.js', // Берем Slick
        'app/js/script.js' // our file js
        ])
        /*.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js*/
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку dist/js
});
 
gulp.task('watch',['browserSync', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('mainjs', function() {
  var filterJS = gulpFilter('app/**/*.js', { restore: true });
    return gulp.src(mainBowerFiles())
        .pipe(filterJS)                                         
        .pipe(flatten())                                        
        .pipe(gulp.dest('app/js/libs'))  
});

gulp.task('maincss', function() {
  var filterCSS = gulpfilter('app**/*.css', {restore: true});
    return gulp.src(mainBowerFiles())
        .pipe(filterCSS)                                         
        .pipe(flatten())                                        
        .pipe(gulp.dest('app/libs/css'))  
});
/*
gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(uglify())
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});*/

gulp.task('imagemin', function(){
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', function() {
  del('dist');
});

gulp.task('build', ['clean', 'imagemin', 'sass', 'uglify', 'fonts'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        ])
    .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src([
        'app/js/**/*']) // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);


