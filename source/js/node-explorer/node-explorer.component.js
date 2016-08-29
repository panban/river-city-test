class ExplorerViewer {

  static get $inject() {
    return ['$scope', '$element', '$compile'];
  }

  constructor($scope, $element ,$compile) {
    this.$scope = $scope;
    this.$element = $element;
    this.$compile = $compile;
  }

  $onChanges(change) {
    if (!change.vfsNode) {
      return;
    }

    this.clearNodeExplorer();
    this.createNodeExplorer();
    this.readNodeExplorer();
  }

  clearNodeExplorer() {
    if (!this.nodeExplorer) {
      return;
    }

    this.nodeExplorer.$scope.$destroy();
    this.nodeExplorer = null;
    this.nodeElement.remove();
    this.nodeElement = null;
  }

  createNodeExplorer() {
    if (!this.vfsNode) {
      return;
    }

    var vfs$ = this.vfsNode.vfs$();
    var designer = vfs$.designer;
    var editorName = designer.explorerName();

    if (!editorName) {
      return;
    }

    var scope = this.$scope;
    var compileFn = this.$compile('<' + editorName +  ' vfs-node="$ctrl.vfsNode" ></' + editorName + '>');
    var element = compileFn(scope);
    this.$element.append(element);
    this.nodeElement = element;
  }

  readNodeExplorer() {}

  assignNodeExplorer(nodeExplorer) {
    this.nodeExplorer = nodeExplorer;
    this.nodeExplorer.readNode();
  }
}

var templateUrl = require('./node-explorer.template.html');
angular.module('vfs').component('vfsNodeExplorer', {
  controller: ExplorerViewer,
  templateUrl: templateUrl,
  bindings: {
    vfsNode: '<'
  }
});
