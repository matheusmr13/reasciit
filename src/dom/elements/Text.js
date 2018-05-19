const Element = require('./Element');
const Style = require('./Style');

class Text extends Element {
  constructor(value) {
    super();
    this.value = value;
  }

  render(parentStyle) {
    return new Style(parentStyle, this.style).compute(this.value);
  }
}

module.exports = Text;
