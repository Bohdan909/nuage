'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var babel = require("gulp-babel");

gulp.task('sass', function () {
 return gulp.src('./sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({compatibility: 'ie10'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css'));
});

gulp.task('html', function() {
  gulp.src(['*.html','*.htm'])
      //.pipe(embedlr())
      .pipe(gulp.dest('dist/'));
      //.pipe(refresh(server));
});

gulp.task('js', function(){
  gulp.src(['js/**/*'])
      //.pipe(sourcemaps.init())
      .pipe(babel())
      //.pipe(sourcemaps.write("."))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
  gulp.src(['images/**/*'])
      .pipe(gulp.dest('dist/images'));
});

gulp.task('img', function() {
  gulp.src(['img/**/*'])
      .pipe(gulp.dest('dist/img'));
});

gulp.task('video', function() {
  gulp.src(['video/**/*'])
      .pipe(gulp.dest('dist/video'));
});

gulp.task('fonts', function(){
  gulp.src(['fonts/**/*'])
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('pdf', function() {
  gulp.src(['*.pdf'])
      .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  gulp.src(['css/**/*'])
      .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function(){
  gulp.watch('sass/*.scss',['sass','css']);
  gulp.watch('js/**/*.js',['js']);
  gulp.watch(['*.html','*.htm'],['html']);
});

gulp.task('favicon', function() {
  gulp.src(['favicon.ico'])
      .pipe(gulp.dest('dist'));
});


gulp.task('media', ['images', 'img', 'video', 'pdf']);
gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['sass', 'html', 'js', 'media', 'css','favicon']);