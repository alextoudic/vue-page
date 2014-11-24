var config      = require('../../gulpConfig.json'),
    gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    runSequence = require('run-sequence');

gulp.task('watch', function () {
  global.use_folder = config.folders.temp;
  global.devMode = true;
  
  var tasks = [];
  
  if (config.copy) {
    tasks.push('copy');
  }
  
  if (config.browserify) {
    tasks.push('browserify');
  }
  else {
    tasks.push('scripts');
  }
  
  if (config.jade) {
    tasks.push('jade');
  }
  
  if (config.stylus) {
    tasks.push('stylus');
  }
  
  if (config.sass) {
    tasks.push('sass');
  }

  if (config.browsersync) {
    runSequence('clean', tasks, 'browser-sync');
  }
  else {
    runSequence('clean', tasks);
  }

  watch([config.folders.source+'/assets/**/*', config.folders.source+'/index.html'], function (files, cb) {
    gulp.start('copy', cb);
  });
  
  if (config.copy) {
    watch([config.folders.source+'/**/*{'+config.copy.extensions.join(',')+'}', config.folders.source+'/index.html'], function (files, cb) {
      gulp.start('copy', cb);
    });
  }
  
  if (!config.browserify) {
    watch(config.folders.source+'/scripts/**/*.js', function (files, cb) {
      gulp.start('scripts', cb);
    });
  }
  
  if (config.jade) {
    watch(config.folders.source+'/**/*.jade', function (files, cb) {
      gulp.start('jade', cb);
    });
  }
  
  if (config.stylus) {
    watch(config.folders.source+'/styles/**/*.styl', function (files, cb) {
      gulp.start('stylus', cb);
    });
  }
  
  if (config.sass) {
    watch(config.folders.source+'/styles/**/*.scss', function (files, cb) {
      gulp.start('sass', cb);
    });
  }
});
