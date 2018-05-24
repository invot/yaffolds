const gulp = require('gulp'),
      watch = require('gulp-watch'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      pump = require('pump'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      minifyCSS = require('gulp-csso'),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify-es').default,
      concat = require('gulp-concat'),
      browserSync = require('browser-sync').create();

gulp.task('pug', () => {
  return gulp.src('./src/templates/views/*.pug')
    .pipe(plumber({errorHandler: notify.onError({
        message: "<%= error.message %>",
        title: "Template compilation"
      })}))
    .pipe(pug({
      basedir: '.'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream())
})

gulp.task('scss', () => {
  return gulp.src('./src/css/main.scss')
    .pipe(plumber({errorHandler: notify.onError({
        message: "<%= error.message %>",
        title: "CSS preprocessing"
      })}))
    .pipe(sass())
    .pipe(postcss([autoprefixer({browsers: ['last 3 version']})]))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('js', (b) => {
  pump([
      gulp.src(['./src/js/vendors/*.js','./src/js/vendors/plugins/*.js', './src/js/main.js']),
      // babel({ presets: ['env'] }), // CONVERT TO ES5
      concat('main.min.js'),
      uglify(),
      gulp.dest('./dist/js/')
    ],
    b
  );
});

gulp.task('serve', () => {
    browserSync.init({
        server: "./dist/",
        open: false,
    })
    gulp.watch("./src/css/**/*.scss", ['scss'])
    gulp.watch("./src/js/**/*.js", ['js'])
    gulp.watch("./src/templates/**/*.pug", ['pug'])
    gulp.watch('./src/img/**/*', browserSync.reload)
})

gulp.task('img', function () {
  return gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('fonts', function () {
  return gulp.src('./src/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('apps', function () {
  return gulp.src('./src/apps/**')
    .pipe(gulp.dest('./dist/apps/'));
});

gulp.task('build', [ 'pug', 'scss', 'apps', 'fonts', 'img', 'js' ])
gulp.task('default', [ 'build', 'serve' ])
