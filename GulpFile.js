var gulp = require('gulp')
var uglify = require('gulp-uglify')
var changed = require('gulp-changed')
var imagemin = require('gulp-imagemin')
var stripDebug = require('gulp-strip-debug')
var minifyCSS = require('gulp-minify-css')
var minifyHTML = require('gulp-minify-html')
var browserify = require('gulp-browserify')

gulp.task('js', function () {
  gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('css', function () {
  gulp.src('app/css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*' }))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('images', function () {
  var imgSrc = './app/images/**/*'
  var imgDest = './public/images'

  gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest))
})

gulp.task('html', function () {
  var htmlSrc = './app/*.html'
  var htmlDest = './public'

  gulp.src(htmlSrc)
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDest))
})

gulp.task('fonts', function () {
  var fonts = './app/fonts/**'
  var fonts1 = './app/fonts1/**'

  gulp.src(fonts)
    .pipe(gulp.dest('./public/fonts'))

  gulp.src(fonts1)
    .pipe(gulp.dest('./public/fonts1'))
})

gulp.task('data', function () {
  gulp.src('app/data.json')
    .pipe(gulp.dest('./public'))
})

gulp.task('music', function () {
  gulp.src('app/Musica/**/*')
    .pipe(gulp.dest('./public/Musica'))
})

gulp.task('default', [ 'js', 'css', 'images', 'html', 'fonts', 'data', 'music' ])
