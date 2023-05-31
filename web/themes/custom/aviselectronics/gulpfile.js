'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const sourcemaps = require('gulp-sourcemaps');


/* Dev
==================== */

/* Style */
gulp.task('dev:styles', function() {

  return gulp.src('./sass/global.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
});


/* Watch
===================== */

/* Watch */
gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', gulp.series('dev:styles')); // watch styles
});