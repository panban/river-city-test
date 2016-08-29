class VfsExplorerNav {

  static get $inject() {
    return ['vfs'];
  }

  constructor(vfs) {
    this.vfs = vfs;
  }

  $onInit() {
    this.depth = (this.depth || 0) + 1;
  }

  padding() {
    var step = 20;
    var unit = 'px';

    var padding = this.depth * step;
    return padding + unit;
  }

  openNode(node) {
    this.vfs.openNode(node);
  }

  isOpen(node) {
    return this.vfs.isOpen(node);
  }

  icon(node) {
    if (!node) {
      return;
    }

    var designer = node.vfs$().designer;
    var icon = designer.icon();
    var className = `icon-${icon}-s`;
    return className;
  }
}

var templateUrl = require('./explorer-nav-item.template.html');
angular.module('vfs').component('vfsExplorerNavItem', {
  templateUrl: templateUrl,
  controller: VfsExplorerNav,
  require: {
    explorerNavCtrl: '^vfsExplorerNav'
  },
  bindings: {
    node: '<',
    depth: '<'
  }
});
