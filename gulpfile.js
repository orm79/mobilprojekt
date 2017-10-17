//require dependencies
var gulp   = require('gulp'),
sass       = require('gulp-sass'),
concat     = require('gulp-concat'),
autoprefix = require('gulp-autoprefixer'),
wait       = require('gulp-wait');


//error logging
function errorLog(error) {
console.error.bind(error);
this.emit('end');
}

//sass compiling /sass -> dev/css/
gulp.task('sass', function () {
return gulp.src('sass/app.sass')
.pipe(wait(500))
.pipe(sass.sync().on('error', sass.logError))
.pipe(gulp.dest('dev/css'))
});

//css concat bulma and manual css
gulp.task('css-concat', ['sass'], function() {
return gulp.src(['dev/css/app.css', 'dev/css/*.css', '!dev/css/style.css'])
.pipe(concat('style.css'))
.on('error', errorLog)
.pipe(gulp.dest('dev/css/'));
});

//css auto-prefixing on style.css
gulp.task('css-prefix', ['css-concat'], function() {
gulp.src('dev/css/style.css')
.pipe(autoprefix({
browsers: ['last 2 versions'],
cascade: false
}))
.pipe(gulp.dest('dev/css/'))
});

//js concat *.js -> main.js
gulp.task('js-concat', function() {
return gulp.src(['dev/js/**/*.js', '!dev/js/main.js'])
.pipe(concat('main.js'))
.on('error', errorLog)
.pipe(gulp.dest('dev/js/'));
});

//copy relevant items from dev -> pub
gulp.task('to-pub', function() {
  gulp.src(['dev/**/*.php',
           'dev/img/**/*',
           'dev/css/style.css',
           'dev/js/main.js'
          ], {base: './dev/'})
    .pipe(gulp.dest('pub/'))
    .on('error', errorLog)
});

//watch-task for js + sass changes
gulp.task('watch', function () {
gulp.watch(['dev/js/**/*.js', '!dev/js/main.js'], ['js-concat']);
gulp.watch('sass/**/*.sass', ['sass', 'css-concat', 'css-prefix']);
});

//default
gulp.task('default', ['js-concat', 'sass', 'css-concat', 'css-prefix', 'watch']);