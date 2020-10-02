var gulp = require('gulp'),
    scss = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    autoprefixer = require('gulp-autoprefixer');



//препроцкссоры
gulp.task('scss',function(){
    return gulp.src('app/scss/style.scss')
            .pipe(scss({outputStyle: 'compressed'}))
            .pipe(autoprefixer({overrideBrowserslist: ['last 8 version']}))
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}))
});

//собираем все стили плагинов в один
gulp.task('style', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.css',
    ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
});

//собираем все скрипты плагинов в один
gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

//сжимаем изображения
gulp.task('imagemin', function(){
     return gulp.src([
         'content/*.jpg',
         'content/*.png',         
     ])
        .pipe(imagemin())
        .pipe(gulp.dest('app/images'))
});

//конвертируем шрифты
gulp.task('ttf2woff', function(){
    return gulp.src('content/*.ttf')
        .pipe(ttf2woff())
        .pipe(gulp.dest('app/fonts'))
});

gulp.task('ttf2woff2', function(){
    return gulp.src('content/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest('app/fonts'))
});

//функция отслеживания изменений
gulp.task('html', function(){
    return gulp.src('app/*.html')
            .pipe(browserSync.reload({stream: true}))
});
gulp.task('js', function(){
    return gulp.src('app/js/*.js')
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function(){
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('content/*.jpg', gulp.parallel('imagemin'));
    gulp.watch('content/*.png', gulp.parallel('imagemin'));
    gulp.watch('content/*.ttf', gulp.parallel('ttf2woff'));
    gulp.watch('content/*.ttf', gulp.parallel('ttf2woff2'));
});

//поднимаем локальный сервер
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
});

//вызываем все функции
gulp.task('default', gulp.parallel('scss', 'html', 'js', 'watch', 'browserSync', 'script', 'style'));