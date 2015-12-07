'use strict';

const gulp        = require('gulp');
const gutil       = require('gulp-util');
const source      = require('vinyl-source-stream');
const babelify    = require('babelify');
const watchify    = require('watchify');
const exorcist    = require('exorcist');
const browserify  = require('browserify');
const browserSync = require('browser-sync').create();

// Input file.
watchify.args.debug = true;
const bundler = watchify(browserify('./app/js/app.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'app/js'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', (err) => {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
        })
        .pipe(exorcist('app/js/dist/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/js/dist'))
        .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', () =>{
    return bundle();
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle'], () => {
    browserSync.init({
        server: "./app"
    });
});
