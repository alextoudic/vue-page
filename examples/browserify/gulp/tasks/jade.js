var config       = require('../../gulpConfig.json'),
    gulp         = require('gulp'),
    jade         = require('gulp-jade')
    handleErrors = require('../util/handleErrors'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

gulp.task('jade', function() {
  return gulp.src(config.folders.source + '/index.jade')
    .pipe(jade({
      locals: config.jade.locals
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(global.use_folder))
    .pipe(reload({
      stream: true
    }));
});
