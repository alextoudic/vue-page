var config       = require('../../gulpConfig.json'),
    gulp         = require('gulp'),
    source       = require('vinyl-source-stream'),
    gulpif       = require('gulp-if'),
    browserify   = require('browserify'),
    watchify     = require('watchify'),
    jadeify      = require('jadeify'),
    stringify    = require('stringify'),
    uglify       = require('gulp-uglify'),
    handleErrors = require('../util/handleErrors'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    handleErrors = require('../util/handleErrors');

gulp.task('browserify', function() {
  var bundle, bundler;

  bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: config.browserify.extensions,
    debug: global.devMode
  })
  .transform([stringify(['.html']), jadeify, 'browserify-shim'])
  .add(config.folders.source+'/scripts/app.js');

  bundle = function() {
    return bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(global.use_folder+'/scripts'))
      .pipe(reload({
        stream: true
      }));
  };

  if (global.devMode) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});
