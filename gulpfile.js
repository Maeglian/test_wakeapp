const gulp = require('gulp');
const plumber = require('gulp-plumber');
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const concat = require('gulp-concat-css');
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const server = require('browser-sync').create();

gulp.task("css", function() {
  return gulp.src("less/**/*.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest("css"))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(csso())
    .pipe(concat("style.css"))
    .pipe(rename({
        suffix: "-min",
        extname: ".css"
    }))
    .pipe(gulp.dest("./css"))
    .pipe(server.stream());
});

gulp.task('serve', function() {
    server.init({
        server: {
            baseDir: "./",
            }
        });

  gulp.watch("less/**/*.less", gulp.series("css"));
	gulp.watch("**/*.html").on("change", server.reload);
});
