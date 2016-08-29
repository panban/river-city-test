class VfsComponent {

  static get $inject() {
    return ['vfs'];
  }

  constructor(vfs) {
    this.vfs = vfs;
    this.vfs.assignVfsComponent(this);
    this.refreshFolder();
  }

  folderChanges() {
    this.refreshFolder();
  }

  refreshFolder() {
    this.node = this.vfs.openedNode;
  }
}

var templateUrl = require('./vfs.template.html');
angular.module('vfs').component('vfs', {
  templateUrl: templateUrl,
  controller: VfsComponent
});
