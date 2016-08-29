class NodeDesigner {

  static get $inject() {
    return ['spec', 'vfs$designer'];
  }

  constructor(spec, vfs$designer) {
    this.spec = spec;
    this.vfs$designer = vfs$designer;
  }

  createNode() {}

  explorerName() {}

  icon() {}
}

module.exports = NodeDesigner;
