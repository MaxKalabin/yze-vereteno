const gulp = require("gulp");
const less = require("gulp-less");

/* ----------------------------------------- */
/*  Compile Less
/* ----------------------------------------- */
const YZEVERETENO_LESS = ["less/**/*.less", "less/*.less"];

function compileLESS() {
  return gulp
    .src(["less/yzevereteno.less", "less/yzeveretenomce.less"])
    .pipe(less())
    .pipe(gulp.dest("./css"));
}
const css = gulp.series(compileLESS);

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
  gulp.watch(YZEVERETENO_LESS, css);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(gulp.parallel(css), watchUpdates);
exports.css = css;
