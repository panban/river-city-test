var spec = {
  id: 'folder',
  title: 'Folder',
  designer: 'vfs.spec.folder.designer'
};

var app = angular.module('vfs');
app.config(FileDesignerConfig);

FileDesignerConfig.$inject = ['vfs$designerProvider'];
function FileDesignerConfig(vfs$designer) {
  vfs$designer.spec(spec);
}

var baseClass = require('../designer');
class FileDesigner extends baseClass {

  createNode() {
    var node = {
      specId: spec.id,
      title: spec.title,
      children: []
    };

    return node;
  }

  explorerName() {
    return 'vfs-folder-explorer';
  }

  icon() {
    return 'folder';
  }
}

module.exports = FileDesigner;