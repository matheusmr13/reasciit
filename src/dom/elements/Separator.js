const Element = require('./Element');
const Text = require('./Text');

class Separator extends Element {
  constructor(char = ' ') {
    super();
    this.char = char;
  }

  render(parentStyle) {
    return new Text('').withStyle({
      paddingChar: this.char
    }).render(parentStyle);
  }
}

module.exports = Separator;
