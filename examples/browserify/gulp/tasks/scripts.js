var config       = require('../../gulpConfig.json'),
    gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    gulpif       = require('gulp-if'),
    handleErrors = require('../util/handleErrors'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

gulp.task('scripts', function () {
  gulp.src(config.folders.source+'scripts/**/*.js')
    .pipe(gulpif(global.devMode, uglify()))
    .on('error', handleErrors)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(use_folder+'/scripts'))
    .pipe(reload({
      stream: true
    }));
});
