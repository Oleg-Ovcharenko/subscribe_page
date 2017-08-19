"use strict";

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    csscomb      = require('gulp-csscomb'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),  // minifaed js file
    cssnano      = require('gulp-cssnano'),   // minifaed css file
    rename       = require('gulp-rename'),
    notify       = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin      = require('gulp-htmlmin');

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: './dist'
    },
    notify: false
  });
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
  //.pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist/'))
  .pipe(notify('Сhanges on HTML. Done.'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function(){
  return gulp.src('app/sass/*.sass')
  .pipe(sass())
  .pipe(csscomb())
  .pipe(gulp.dest('app/css'))
});

gulp.task('css', function(){
  return gulp.src([
    //'../libs/bootstrap/dist/css/bootstrap.css', You can change this paremeter
    'app/css/reset.css',
    'app/css/style.css',
    'app/css/medea.css'
  ])
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer('last 30 version'))
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css/'))
  .pipe(notify('Сhanges on CSS. Done.'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src([
    //'../libs/bootstrap/dist/js/bootstrap.js', You can change this paremeter
    'app/js/*.js'
  ])
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
  .pipe(notify('Сhanges on JS. Done.'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browser-sync', 'html', 'css', 'js'], function(){
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/sass/*.sass', ['sass']);
  gulp.watch('app/css/*.css', ['css']);
  gulp.watch('app/js/*.js', ['js']);
});

gulp.task('default', ['watch']);
