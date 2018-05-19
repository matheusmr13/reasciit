const Element = require('./Element');

class Line extends Element {
  render() {
    return this.children.map(child => child.render()).join('');
  }
}

module.exports = Line;
