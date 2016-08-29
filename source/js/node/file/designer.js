var spec = {
  id: 'file',
  title: 'File',
  designer: 'vfs.spec.file.designer'
};

var app = angular.module('vfs');
app.config(FolderDesignerConfig);

FolderDesignerConfig.$inject = ['vfs$designerProvider'];
function FolderDesignerConfig(vfs$designer) {
  vfs$designer.spec(spec);
}

var baseClass = require('../designer');
class FolderDesigner extends baseClass {

  createNode() {
    var node = {
      specId: spec.id,
      title: spec.title,
      content: ''
    };

    return node;
  }

  explorerName() {
    return 'vfs-file-explorer';
  }

  icon() {
    return 'file';
  }
}

module.exports = FolderDesigner;
