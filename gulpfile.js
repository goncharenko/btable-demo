var $ = require('gulp-load-plugins')({
  lazy: true
});
var colors = $.util.colors;
var concat = require('gulp-concat');
var config = require('./gulp.config')();
var del = require('del');
var gulp = require('gulp');
var inject = require('gulp-inject');
var livereload = require('gulp-livereload');
var merge2 = require('merge2');
var print = require('gulp-print');
var replace = require('gulp-replace');
var series = require('stream-series');
var wiredep = require('wiredep');

gulp.task('default', ['clean'], function() {
  gulp.start('index');
});

gulp.task('watch', function() {
  livereload({
    start: true,
    quiet: true
  });
  log(config.client + '**/*.*');
  gulp.watch(config.client + '**/*.*', ['scripts', 'styles']);
});

gulp.task('clean', function() {
  var delconfig = [].concat(
     config.build + 'scripts',
     config.build + 'styles',
     config.build + 'vendor');
  log('Cleaning: ' + colors.blue(delconfig));
  return del(delconfig);
});

gulp.task('bower', function() {
  var options = config.getWiredepDefaultOptions();

  gulp.src(config.index)
     .pipe(wiredep(options)
        .stream)
     .pipe(gulp.dest(config.build));
});

gulp.task('scripts', function() {
  return gulp.src(config.js)
     .pipe($.if(config.jsOrder, $.order(config.jsOrder)))
     .pipe(concat('demo.js'))
     .pipe(gulp.dest(config.build + '/scripts/'))
     .pipe(livereload());
});

gulp.task('styles', function() {
  return gulp.src(config.css)
     .pipe(concat('demo.css'))
     .pipe(gulp.dest(config.build + '/styles/'))
     .pipe(livereload());
});

gulp.task('vendor-fonts', function() {
  log('Copying vendor fonts');
  return gulp.src([config.bower.directory +
        'fontawesome/fonts/fontawesome-webfont.*'
     ])
     .pipe(gulp.dest(config.build + 'vendor/fonts/'));
});

gulp.task('vendor-scripts', function() {
  log('Copying vendor scripts');
  var options = config.getWiredepDefaultOptions();

  var bowerStream = gulp.src(wiredep(options)
        .js)
     .pipe(gulp.dest(config.build + 'vendor/scripts'));
});

gulp.task('vendor-styles', function() {
  log('Copying vendor styles');
  var options = config.getWiredepDefaultOptions();
  return gulp.src(wiredep(options)
        .css)
     .pipe(gulp.dest(config.build + 'vendor/styles'));
});

// gulp.task('vendor-fonts', function() {
//   return gulp.src([config.bower.directory +
//     'fontawesome/fonts/fontawesome-webfont.*'])
//     .pipe(gulpFn(renameFile))
//     .pipe(gulp.dest(config.build + 'vendor/fonts/'));
// });

gulp.task('wiredev', ['vendor-fonts', 'vendor-scripts', 'vendor-styles', 'scripts', 'styles'],
   function() {
      return gulp.src(config.index)
         .pipe(wiredep.stream({
            fileTypes: {
              html: {
                replace: {
                  js: function(filePath) {
                    return '<script src="' + 'dist/vendor/scripts/' + filePath.split('/')
                       .pop() + '"></script>';
                  },
                  css: function(filePath) {
                    return '<link rel="stylesheet" href="' + 'dist/vendor/styles/' +
                       filePath.split('/')
                       .pop() + '"/>';
                  }
                }
              }
            }
          }))
         .pipe(gulp.dest('./'));
    });

gulp.task('index', ['wiredev'], function() {
  var target = gulp.src('index.html');

  var appSteram = gulp.src([config.build + 'scripts/**/*.js'], {
    read: false
  });
  var cssStream = gulp.src([config.build + 'styles/**/*.css'], {
    read: false
  });

  return target.pipe(inject(series(appSteram, cssStream), {
        relative: true
      }))
     .pipe(gulp.dest('./'))
     .pipe(livereload());
});

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log(colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log(colors.blue(msg));
  }
}
