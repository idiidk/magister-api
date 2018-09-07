const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const del = require('del');
const glob = require('glob');
const path = require('path');
const isparta = require('isparta');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const Instrumenter = isparta.Instrumenter;
const manifest = require('./package.json');

// Load all of our Gulp plugins
const $ = loadPlugins();

// Gather the library data from `package.json`
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

function cleanDist(done) {
  del([destinationFolder]).then(() => done());
}

function cleanTmp(done) {
  del(['tmp']).then(() => done());
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

function lintSrc() {
  return lint('src/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.js');
}

function build() {
  return gulp.src(path.join('src', config.entryFileName))
    .pipe(webpackStream({
      output: {
        filename: `${exportFileName}.js`,
        libraryTarget: 'umd',
        library: config.mainVarName
      },
      // Add your own externals here. For instance,
      // {
      //   jquery: true
      // }
      // would externalize the `jquery` module.
      externals: {
        'axios': true
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest(destinationFolder))
    .pipe($.filter(['**', '!**/*.js.map']))
    .pipe($.rename(`${exportFileName}.min.js`))
    .pipe($.sourcemaps.init({
      loadMaps: true
    }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(destinationFolder));
}

function coverage(done) {
  _registerBabel();
  gulp.src(['src/**/*.js'])
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      done();
    });
}

const watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.eslintrc'];

// Build on change
function watch() {
  gulp.watch(watchFiles, ['build']);
}

// Remove the built files
gulp.task('clean', cleanDist);

// Remove our temporary files
gulp.task('clean-tmp', cleanTmp);

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-gulpfile']);

// Build two versions of the library
gulp.task('build', ['lint', 'clean'], build);

// Set up coverage and run tests
gulp.task('coverage', ['lint'], coverage);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// An alias of test
gulp.task('default', ['build']);