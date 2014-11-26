var gulp  = require('gulp'),
    del   = require('del');

gulp.task('clean', function (cb) {
  return del([global.use_folder], cb);
});
