class FileExplorer {

  static get $inject() {
    return ['$scope', '$filter', 'vfs', 'vfs$designer'];
  }

  constructor($scope, $filter, vfs, vfs$designer) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.vfs = vfs;
    this.vfs$designer = vfs$designer;
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
    node.content = vfsNode.content;
    this.node = node;
  }

  onDeleteFile(e) {
    e.preventDefault();
    this.vfs.deleteFile();
  }

  onSaveFile(e) {
    e.preventDefault();
    this.vfsNode.content = this.node.content;
  }

  get fileSize() {
    if (!this.vfsNode) {
      return;
    }

    var size = this.vfs$designer.fileSize(this.vfsNode);
    size = this.$filter('formatSizeUnits')(size);
    return size;
  }
}

var templateUrl = require('./explorer.template.html');
angular.module('vfs').component('vfsFileExplorer', {
  controller: FileExplorer,
  templateUrl: templateUrl,
  require: {
    explorerCtrl: '^vfsNodeExplorer'
  },
  bindings: {
    vfsNode: '<'
  }
});
