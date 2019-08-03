const gulp = require('gulp');
const sass = require('gulp-sass');
sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();
// Paths
var paths = {
  styles: {
      // where to find scss files
      src: "./scss/**/*.scss",
      // where to put css
      dest: "./css"
  }
     // create simmilar paths below
};

// compilse scss to css
function style(){
    // find file using path from above
    return gulp
    .src(paths.styles.src)
    // 2pass to source map and compiler
      .pipe(sourcemaps.init())
      .pipe(sass()
      .on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
    // Store the css
    .pipe(gulp.dest(paths.styles.dest))
    // kick browser sync
    .pipe(browserSync.stream());
}
// stuff that works while gulp watch(es)
function watch(){
    browserSync.init({
        notify:false,
        injectChanges: true,
        server:{
          baseDir: "./",
        }
      });
    // runs the styles function above
    gulp.watch(paths.styles.src, style)
    // browser reloads for the following changes, (changes for css handled above without reload)
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;
