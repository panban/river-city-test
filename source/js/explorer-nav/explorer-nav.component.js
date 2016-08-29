class VfsFolderThreeComponent {

  static get $inject() {
    return ['vfs'];
  }

  constructor(vfs) {
    this.root = vfs.root;
  }
}

var templateUrl = require('./explorer-nav.template.html');
angular.module('vfs').component('vfsExplorerNav', {
  templateUrl: templateUrl,
  controller: VfsFolderThreeComponent
});
