class BuilderService {

  static get $inject() {
    return ['vfs$designer'];
  }

  constructor(vfs$designer) {
    this.vfs$designer = vfs$designer;
  }

  wrapNode(node) {
    this.injectBuilder(node);
    var specId = node.specId;
    var designer = this.vfs$designer.getDesigner(specId);
    node.vfs$().designer = designer;
  }

  unwrapNode(node) {
    delete node.vfs$;
  }

  injectBuilder(node) {
    var item = {
      builder: this
    };

    node.vfs$ = function() {
      return item;
    };
  }

  injectParent(node, parent) {
    node.vfs$().parent = parent;
  }

  createRoot() {
    var designer = this.vfs$designer.designerRoot();
    var node = designer.createNode();
    return node;
  }

  createFolder() {
    var designer = this.vfs$designer.designerFolder();
    var node = designer.createNode();
    return node;
  }

  createFile() {
    var designer = this.vfs$designer.designerFile();
    var node = designer.createNode();
    return node;
  }
}

var app = angular.module('vfs');
app.service('vfs$builder', BuilderService);
