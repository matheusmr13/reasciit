const Element = require('./Element');
const Style = require('./Style');

class Span extends Element {
  constructor(text, width) {
    super();
    this.text = text;
    this.width = width;
  }

  render(parentStyle) {
    return new Style(parentStyle, Object.assign({}, this.style, {
      width: this.width
    })).compute(this.text);
  }
}

module.exports = Span;
