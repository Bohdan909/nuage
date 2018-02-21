'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
 return gulp.src('./sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({compatibility: 'ie10'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css'));
});

gulp.task('default', ['sass']);