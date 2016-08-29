var spec = {
  id: 'root',
  title: 'Root',
  designer: 'vfs.spec.root.designer'
};

var app = angular.module('vfs');
app.config(RootDesignerConfig);

RootDesignerConfig.$inject = ['vfs$designerProvider'];
function RootDesignerConfig(vfs$designer) {
  vfs$designer.spec(spec);
}

var baseClass = require('../designer');
class RootDesigner extends baseClass {

  createNode() {
    var node = {
      specId: spec.id,
      title: spec.title,
      children: []
    };

    return node;
  }

  explorerName() {
    return 'vfs-root-explorer';
  }

  icon() {
    return 'folder';
  }
}

module.exports = RootDesigner;