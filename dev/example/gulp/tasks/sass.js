var config       = require('../../gulpConfig.json'),
    gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    nib          = require('nib'),
    handleErrors = require('../util/handleErrors'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

gulp.task('sass', function () {
  var options = {
    linenos: global.devMode,
    compress: !global.devMode
  };
  
  if (config.stylus.nib) {
    options.use = [nib()];
  }
  
  gulp.src(config.folders.source+'/styles/main.scss')
    .pipe(stylus(options))
    .on('error', handleErrors)
    .pipe(gulp.dest(global.use_folder+'/styles'))
    .pipe(reload({
      stream: true
    }));
});
