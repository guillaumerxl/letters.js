var gulp = require('gulp');
var transpile  = require('gulp-es6-module-transpiler');
var minify = require('gulp-minify');
var paths = {
   scripts: ['src/*.{es,js}']
};

gulp.task('build', function() {
    return gulp.src(paths.scripts)
        .pipe(transpile({
          formatter: 'bundle'
        }))
        .pipe(gulp.dest('lib'));
})

gulp.task('default', ['build']);
