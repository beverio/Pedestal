var gulp = require('gulp'),
  glob = require('glob'),
  zip = require('gulp-zip'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  gulpsync = require('gulp-sync')(gulp),
  colorguard = require('gulp-colorguard'),
  autoprefixer = require('gulp-autoprefixer'),
  localScreenshots = require('gulp-local-screenshots');


gulp.task('jade', function () {
  return gulp.src('app/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function() {
  gulp.src('app/sass/*.sass')
    .pipe(sass({
      //sourceComments: true
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('themes', function() {
  gulp.src('app/sass/themes/*.sass')
    .pipe(sass({
      //sourceComments: true
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/themes/css/'))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/themes/css/'));
});

gulp.task('themes-jade', function() {
  var files = glob.sync('app/sass/themes/*.sass');
  var filenames = []
  files.forEach(function(file) {
    var filename = file.split("/").pop().split(".")[0];
    filenames.push(filename)
  });

  GLOBAL.themeFiles = filenames;
  filenames.map(function(file) {
    var themeLocals = {
      themeName: file
    };
    gulp.src('app/jade/themes/index.jade')
    .pipe(jade({
      pretty: true,
      locals: themeLocals
    }))
    .pipe(rename({
      basename: file
    }))
    .pipe(gulp.dest('dist/themes/'));
  });
});

gulp.task('themes-screens', function () {
  gulp.src('./dist/themes/*.html')
  .pipe(localScreenshots({
    width: ['1280'],
    height: ['720'],
    port: '8000/themes',
    host: 'localhost',
    server: false,
    type: 'png',
    folder: './dist/img/themes'
  }));
});

gulp.task('browsersync', function() {
  reload = browserSync.reload
  browserSync({
    server: {
      "baseDir": './dist',
      "index": 'index.html'
    },
    port: 8000,
    files: ['dist/**'],
    open: false,
    online: true,
    // Notifications are disabled because they would sometimes appear on the screenshots
    notify: false
  })
});

gulp.task('zip', function () {
  gulp.src(['app/sass/**/*', '!app/sass/grid.sass', '!app/sass/style.sass'])
    .pipe(zip('sass.zip'))
    .pipe(gulp.dest('dist/downloads/'));
  gulp.src(['dist/css/grid.css', 'dist/css/grid.min.css'])
    .pipe(zip('grid.zip'))
    .pipe(gulp.dest('dist/downloads/'));
  gulp.src(['dist/css/pedestal.css', 'dist/css/pedestal.min.css'])
    .pipe(zip('pedestal.zip'))
    .pipe(gulp.dest('dist/downloads/'));
});

gulp.task('watch', ['jade', 'sass', 'browsersync', 'themes', 'themes-jade', 'themes-screens'], function (){
  gulp.watch('app/sass/**/*.sass', ['sass', 'themes']); 
  gulp.watch('app/jade/**/*.jade', ['jade']); 
})


gulp.task('default', ['watch']);
