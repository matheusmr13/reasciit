const Element = require('./Element');
const Style = require('./Style');

class Field extends Element {
  constructor(label, value) {
    super();
    this.label = label;
    this.value = value;
  }

  render(parentStyle) {
    return new Style(parentStyle, this.style).computeArray(`${this.label}: `, this.value);
  }
}

module.exports = Field;
