var __specs = [];
var __designers = {
  'vfs.spec.root.designer': require('./root/designer'),
  'vfs.spec.folder.designer': require('./folder/designer'),
  'vfs.spec.file.designer': require('./file/designer')
};

var app = angular.module('vfs');
app.provider('vfs$designer', DesignerProvider);
function DesignerProvider() {
  this.$get = DesignerFactory;
  this.spec = function(spec) {
    __specs.push(spec);
  };
}

DesignerFactory.$inject = ['$injector'];
function DesignerFactory($injector) {
  return $injector.instantiate(DesignerService);
}

class DesignerService {

  static get $inject() {
    return ['$injector']
  }

  constructor($injector) {
    this.$injector = $injector;
    this.initSpecs();
  }

  initSpecs() {
    var specMap = {};

    __specs.forEach(spec => {
      specMap[spec.id] = spec;
      this.injectDesigner(spec);
    });

    this._specs = specMap;
  }

  injectDesigner(spec) {
    var designerId = spec.designer;
    var designerClass = __designers[designerId];

    if (!(designerId && designerClass)) {
      return angular.noop;
    }

    var options = {
      spec: spec,
      vfs$designer: this
    };

    var designer = this.$injector.instantiate(designerClass, options);
    spec.vfs$designer = function() {
      return designer;
    };
  }

  getSpec(specId) {
    return this._specs[specId];
  }

  getDesigner(specId) {
    var spec = this.getSpec(specId);
    var designer = spec.vfs$designer();
    return designer;
  }

  designerRoot() {
    var specId = 'root';
    var designer = this.getDesigner(specId);
    return designer;
  }

  designerFolder() {
    var specId = 'folder';
    var designer = this.getDesigner(specId);
    return designer;
  }

  designerFile() {
    var specId = 'file';
    var designer = this.getDesigner(specId);
    return designer;
  }

  isFolder(node) {
    return node && node.specId === 'folder' || node.specId === 'root';
  }

  isFile(node) {
    return node && node.specId === 'file';
  }

  fileSize(file) {
    var empty = 0;

    if (!this.isFile(file)) {
      return empty;
    }

    var size = file.content.length || empty;
    return size;
  }

  folderSize(folder) {
    var empty = 0;

    if (!this.isFolder(folder)) {
      return empty;
    }

    var size = folder.children.reduce((size, node) => {
      if (this.isFolder(node)) {
        size += this.folderSize(node);
      } else {
        size += this.fileSize(node);
      }

      return size;
    }, empty);

    return size;
  }
}
