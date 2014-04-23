var gulp        = require('gulp'),
    nodemon     = require('gulp-nodemon'),
    inject      = require('gulp-inject'),
    template    = require('gulp-template'),
    livereload  = require('gulp-livereload'),
    clean       = require('gulp-clean'),
    runSequence = require('run-sequence'),
    less        = require('gulp-less'),
    minifyCss   = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    minHtml     = require('gulp-minify-html'),
    gzip        = require('gulp-gzip'),
    bower       = require('gulp-bower'),
    karma       = require('gulp-karma'),
    protractor  = require("gulp-protractor").protractor;

var styles_to_process = [
  './src/assets/vendor/normalize.css/normalize.css',
  './src/assets/stylesheets/**/*.less',
  './src/assets/stylesheets/**/*.css',
]

var scripts_to_process = [
  './src/assets/vendor/angular/angular.js',
  './src/assets/vendor/angular-route/angular-route.js',
  './src/assets/vendor/angular-resource/angular-resource.js',
  './src/assets/javascripts/**/*.js'
]

// DEV MODE
// ==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*
gulp.task('default', ['build', 'nodemon', 'watch']);

gulp.task('bower', function(){
  return bower();
});

gulp.task('clean', function(){
  return gulp.src('./build/')
    .pipe(clean({force: true}));
});

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('styles', function() {
  return gulp.src(styles_to_process)
    .pipe(less())
    .pipe(gulp.dest('./build/assets/stylesheets'))
    .pipe(inject("./build/index.html", {ignorePath: 'build'}))
    .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function() {
  return gulp.src(scripts_to_process)
    .pipe(template({apiRemoteUrl: 'http://localhost:1337'}))
    .pipe(gulp.dest('./build/assets/javascripts'))
    .pipe(inject("./build/index.html", {ignorePath: 'build'}))
    .pipe(gulp.dest('./build/'));
});

gulp.task('unit-test', function () {
  var testFiles = scripts_to_process.concat([
                    'src/**/*.html',
                    'src/assets/vendor/angular-mocks/angular-mocks.js',
                    'test/unit/**/*.test.js'
                  ]);
  return gulp.src(testFiles)
          .pipe(karma({
            configFile: 'test/karma.config.js',
            action: 'watch'
          }));
});

gulp.task('e2e-test', function () {
  var testFiles = [ 'test/e2e/**/*.js' ]
  return gulp.src(testFiles)
          .pipe(protractor({ configFile: "test/protractor-conf.js" }))
          .on('error', function(e) { throw e })
});

gulp.task('build', function() {
  runSequence('bower', 'clean', 'html', 'styles', 'scripts', 'unit-test');
});

gulp.task('nodemon', function () {
  nodemon({script: 'app.js', watch: ['./app.js']});
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', ['build']);
  gulp.watch(styles_to_process, ['styles']);
  gulp.watch(scripts_to_process, ['scripts']);

  var livereloadServer = livereload();
  gulp.watch(['build/**/*']).on('change', function(file) {
    livereloadServer.changed(file.path);
  });
});

// PROD MODE
// ==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*==*

gulp.task('clean-deploy', function(){
  return gulp.src('./www/')
    .pipe(clean({force: true}));
});

gulp.task('copy-html-deploy', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./www/'));
});

gulp.task('styles-deploy', function() {
  return gulp.src(styles_to_process)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./www/assets/stylesheets'))
    .pipe(inject("./www/index.html", {ignorePath: 'www'}))
    .pipe(gulp.dest('./www/'));
});

gulp.task('scripts-deploy', function() {
  return gulp.src(scripts_to_process)
    .pipe(template({apiRemoteUrl: 'http://dry-woodland-3049.herokuapp.com/'}))
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./www/assets/javascripts'))
    .pipe(inject("./www/index.html", {ignorePath: 'www'}))
    .pipe(gulp.dest('./www/'));
});

gulp.task('gzip-deploy', function() {
  return gulp.src(['./www/assets/**/*.js', './www/assets/**/*.css'])
    .pipe(gzip())
    .pipe(gulp.dest('./www/assets'));
});

gulp.task('min-html', function() {
  return gulp.src('./www/**/*.html')
    .pipe(minHtml())
    .pipe(gulp.dest('./www/'));
});

gulp.task('deploy', function() {
  runSequence('clean-deploy', 'copy-html-deploy', 'styles-deploy', 'scripts-deploy', 'gzip-deploy');
});