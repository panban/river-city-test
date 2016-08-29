class FolderExplorer {

  static get $inject() {
    return ['$scope', '$filter', 'vfs', 'vfs$designer'];
  }

  constructor($scope, $filter, vfs, vfs$designer) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.vfs$designer = vfs$designer;
    this.vfs = vfs;
  }

  $onInit() {
    this.explorerCtrl.assignNodeExplorer(this);
  }

  readNode() {
    var node = {};
    var vfsNode = this.vfsNode;

    if (!vfsNode) {
      return;
    }

    node.title = vfsNode.title;
    this.node = node;
  }

  onCreateFile(e) {
    e.preventDefault();
    this.vfs.createFile();
  }

  onCreateFolder(e) {
    e.preventDefault();
    this.vfs.createFolder();
  }

  onDeleteFolder(e) {
    e.preventDefault();
    this.vfs.deleteFolder();
  }

  get countFolders() {
    if (!this.vfsNode) {
      return;
    }

    var children = this.vfsNode.children || [];
    var folders = children.filter(p => this.vfs$designer.isFolder(p));
    return folders.length;
  }

  get countFiles() {
    if (!this.vfsNode) {
      return;
    }

    var children = this.vfsNode.children || [];
    var files = children.filter(p => this.vfs$designer.isFile(p));
    return files.length;
  }

  get folderSize() {
    var size = this.vfs$designer.folderSize(this.vfsNode);
    size = this.$filter('formatSizeUnits')(size);
    return size;
  }
}

var templateUrl = require('./explorer.template.html');
angular.module('vfs').component('vfsFolderExplorer', {
  controller: FolderExplorer,
  templateUrl: templateUrl,
  require: {
    explorerCtrl: '^vfsNodeExplorer'
  },
  bindings: {
    vfsNode: '<'
  }
});
