var config      = require('../../gulpConfig.json'),
    gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    modRewrite  = require('connect-modrewrite');

gulp.task('browser-sync', function () {
  var options;
  
  if (config.browsersync.server.pushRewrite) {
    options = {
      server: {
        baseDir: global.use_folder,
        middleware: [
          modRewrite([
            '^[^\\.]*$ /index.html [L]'
          ])
        ]
      }
    };
  }
  else if (config.browsersync.server.proxy) {
    options = {
      proxy: config.browsersync.server.proxy
    };
  }
  else {
    options = {
      server: {
        baseDir: global.use_folder
      }
    };
  }
  
  browserSync(options);
});
