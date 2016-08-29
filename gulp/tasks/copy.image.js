'use strict';

module.exports = () => {
  $.gulp.task('copy:image', () => {
    return $.gulp.src('./source/img/**')
      .pipe($.gulp.dest($.config.root + '/assets/img'));
  });
};
