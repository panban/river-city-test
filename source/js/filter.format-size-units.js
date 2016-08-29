var app = angular.module('vfs');
app.filter('formatSizeUnits', () => {
  var decimal = 2;
  var unit = 1024;
  var empty = 0;
  var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];

  return bytes => {
    bytes = parseInt(bytes) || empty;

    if (!bytes) {
      return empty + ' byte';
    }

    var step = Math.floor(Math.log(bytes) / Math.log(unit));

    var output = bytes / Math.pow(unit, step);
    output = output.toFixed(decimal);
    output = parseFloat(output);
    output = output + ' ' + sizes[step];

    return output;
  };
});
