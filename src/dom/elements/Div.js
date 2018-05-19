const Element = require('./Element');

class Div extends Element {
  static defaultStyle = {
    display: 'block'
  }

  render(parentStyle) {
    return this.children.map(child => child.render(Style.merge(parentStyle, this.style))).join('\n');
  }
}

module.exports = Div;
