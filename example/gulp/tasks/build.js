var config      = require('../../gulpConfig.json'),
    gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function () {
  global.use_folder = config.folders.build;
  global.devMode = false;
  
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

  runSequence('clean', tasks);
});
