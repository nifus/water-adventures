'use strict';

var gulp = require('gulp'),
    bump = require('gulp-bump'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat-util'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    meta = require('./package.json');

var bumpFiles = ['./bower.json', './package.json'],
    paths = {
        dist: __dirname + '/dist',
        js: __dirname + '/src/' + meta.name + '.js'
    },
    description = {
        top: '/* ' + '\n'
            + '   ' + meta.name + ' v' + meta.version + '\n'
            + '   ' + meta.repository.url + '\n'
            + '   MIT License' + '\n'
            + ' */\n\n'
    };

gulp.task('bump', function () {
    return gulp.src(bumpFiles)
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('jshint', function () {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['jshint'], function () {
    return gulp.src(paths.js)
        .pipe(concat.header(description.top))
        .pipe(gulp.dest(paths.dist))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['js']);
