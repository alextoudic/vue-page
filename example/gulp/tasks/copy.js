var config       = require('../../gulpConfig.json'),
    gulp         = require('gulp'),
    handleErrors = require('../util/handleErrors'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

gulp.task('copy', function () {
  gulp.src([config.folders.source+'/**/*{'+config.copy.extensions.join(',')+'}', config.folders.source+'/index.html'])
    .pipe(gulp.dest(use_folder))
    .on('error', handleErrors)
    .pipe(reload({
      stream: true
    }));
});
