var gulp = require('gulp'),
    scss = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');



gulp.task('scss',function(){
    return gulp.src('app/scss/style.scss')
            .pipe(scss({outputStyle: 'compressed'}))
            .pipe(autoprefixer({overrideBrowserslist: ['last 8 version']}))
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}))
});