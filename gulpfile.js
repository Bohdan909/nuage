'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require("gulp-babel");
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');
const plumber = require('gulp-plumber');
const beeper = require('beeper');
const imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
 return gulp.src('./sass/main.scss')
  .pipe(plumber(errorHandler))
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({compatibility: 'ie10'}))
  .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css'));
});

function errorHandler(error) {
  // 3 beeps for error
  beeper('****-*-*');
  return true;
};

function html() {
  return gulp.src(['*.html','*.htm'])
      //.pipe(embedlr())
      .pipe(gulp.dest('dist/'));
      //.pipe(refresh(server));
};

function js(){
  return gulp.src(['js/**/*'])
      //.pipe(sourcemaps.init())
      //.pipe(babel({"presets": ["env"]}))
      //.pipe(uglify())
      //.pipe(concat('main.min.js'))
      //.pipe(sourcemaps.write("."))
      .pipe(gulp.dest('dist/js'));
};

gulp.task('images', function() {
  return gulp.src(['images/**/*'])
      .pipe(imagemin([
        /*imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),*/
        imagemin.svgo({
          plugins: [
            {removeViewBox: false},
            {cleanupIDs: false}
          ]
        })
      ], {
        verbose: true
      }))
      .pipe(gulp.dest('dist/images'));
});

gulp.task('img', function() {
  return gulp.src(['img/**/*'])
      .pipe(imagemin([
        /*imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),*/
        imagemin.svgo({
          plugins: [
            {removeViewBox: false},
            {cleanupIDs: false}
          ]
        })
      ], {
        verbose: true
      }))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('video', function() {
  return gulp.src(['video/**/*'])
      .pipe(gulp.dest('dist/video'));
});

gulp.task('fonts', function(){
  return gulp.src(['fonts/**/*'])
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('pdf', function() {
  return gulp.src(['*.pdf'])
      .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src(['css/**/*'])
      .pipe(gulp.dest('dist/css'));
});

gulp.task('assets', function() {
  return gulp.src(['assets/**/*'])
      .pipe(gulp.dest('dist/assets'));
});

function watch() {
  gulp.watch('sass/*.scss', gulp.series('sass','css'));
  gulp.watch('js/**/*.js', js);
  gulp.watch(['*.html','*.htm'], html);
}
gulp.task('watch', watch);

gulp.task('favicon', function() {
  return gulp.src(['favicon.ico'])
      .pipe(gulp.dest('dist'));
});

gulp.task('clean:cache', function(){
  return del('.sass-cache/**', {force:true});
});

exports.html = html;
exports.js = js;
exports.watch = watch;

const media = gulp.parallel('images', 'img', 'video', 'pdf');
gulp.task('media', media);

const defaultTask = gulp.series('sass', 'watch');
gulp.task('default', defaultTask);

const build =  gulp.series('sass', gulp.parallel('css', html, js, 'assets', 'favicon'));
gulp.task('build', build);