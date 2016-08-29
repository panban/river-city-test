class VfsService {

  static get $inject() {
    return ['vfs$builder', 'vfs$designer'];
  }

  constructor(vfs$builder, vfs$designer) {
    this.vfs$designer = vfs$designer;
    this.vfs$builder = vfs$builder;
    this.createRoot();
    this.openNode(this.root);
  }

  isOpen(node) {
    return this.openedNode === node;
  }

  createRoot() {
    var node = this.vfs$builder.createRoot();
    this.vfs$builder.wrapNode(node);
    this.root = node;
  }

  createFolder() {
    var folderTitle = prompt('Type a folder name');
    folderTitle = (folderTitle || '').trim();

    if (!folderTitle) {
      return;
    }

    var node = this.vfs$builder.createFolder();
    this.vfs$builder.wrapNode(node);
    this.vfs$builder.injectParent(node, this.openedNode);
    node.title = folderTitle;

    this.openedNode.children.push(node);
  }

  createFile() {
    var fileTitle = prompt('Type a file name');
    fileTitle = (fileTitle || '').trim();

    if (!fileTitle) {
      return;
    }

    var node = this.vfs$builder.createFile();
    this.vfs$builder.wrapNode(node);
    this.vfs$builder.injectParent(node, this.openedNode);
    node.title = fileTitle;

    this.openedNode.children.push(node);
  }

  deleteFolder() {
    var hasConfirmed = confirm('Are you sure you want to delete this folder?');

    if (!hasConfirmed) {
      return;
    }

    var vfs$ = this.openedNode.vfs$();
    var parent = vfs$.parent;
    var index = parent.children.indexOf(this.openedNode);

    if (index === -1) {
      return;
    }

    this.vfs$builder.unwrapNode(this.openedNode);
    parent.children.splice(index, 1);

    this.openNode(parent)
  }

  deleteFile() {
    var hasConfirmed = confirm('Are you sure you want to delete this file?');

    if (!hasConfirmed) {
      return;
    }

    var vfs$ = this.openedNode.vfs$();
    var parent = vfs$.parent;
    var index = parent.children.indexOf(this.openedNode);

    if (index === -1) {
      return;
    }

    this.vfs$builder.unwrapNode(this.openedNode);
    parent.children.splice(index, 1);

    this.openNode(parent)
  }

  openNode(node) {
    if (!node) {
      return;
    }

    this.openedNode = node;

    if (this.vfsComponent) {
      this.vfsComponent.folderChanges();
    }
  }

  assignVfsComponent(component) {
    this.vfsComponent = component;
  }
}

var app = angular.module('vfs');
app.service('vfs', VfsService);
