
const prepend = (str, qtt, char = ' ') => `${Array(qtt).fill(char).join('')}${str}`;
const pospend = (str, qtt, char = ' ') => `${str}${Array(qtt).fill(char).join('')}`;

class Style {
  constructor(parentStyle, componentStyle) {
    this.parent = parentStyle || {};
    this.component = componentStyle;
  }

  computeArray(...args) {
    const parentWidth = this.parent.width - this.parent.paddingLeft;
    const { length: elementQtt } = args;
    if (elementQtt > 2) {
      throw new Error('Not implemented');
    }
    const textLen = args.reduce((len, arg) => len + arg.length, 0);
    if (this.component.justifyContent === 'space-between' && elementQtt >= 2) {
      const spaces = elementQtt - 1;
      const restOfSpace = parentWidth - textLen;
      const widthPerSpace = restOfSpace / spaces;
      return this.compute(`${args[0]}${prepend(args[1], widthPerSpace)}`);
    }

    return this.compute(args.join(''));
  }

  compute(textToWrite) {
    const parentWidth = this.component.width || this.parent.width;
    const text = textToWrite.toString();
    let parsedText = text.toString();

    if (this.component.textAlign === 'center') {
      const halfSpace = (parentWidth - parsedText.length) / 2;
      const floatingPoint = (halfSpace % 1 === 0.5);
      const roundHalf = floatingPoint ? halfSpace - 0.5 : halfSpace;
      return prepend(pospend(parsedText, floatingPoint ? roundHalf + 1 : roundHalf), roundHalf);
    }

    if (this.component.textAlign === 'right') {
      parsedText = prepend(parsedText, parentWidth - parsedText.length);
    }

    const paddingLeft = (this.parent.paddingLeft || 0) + (this.component.paddingLeft || 0);
    if (paddingLeft) {
      parsedText = prepend(parsedText, paddingLeft);
    }

    const paddingRight = (this.component.paddingRight || 0);
    if (paddingRight) {
      parsedText = pospend(parsedText, paddingLeft, paddingRight - parsedText.length, this.component.paddingChar);
    }

    if (parsedText.length > parentWidth) {
      const parts = Math.ceil(parsedText.length / parentWidth);
      const lines = Array(parts)
        .fill('')
        .map((item, index) => {
          if (index === parts - 1) {
            return pospend(parsedText.substring(index * parentWidth), (parts * parentWidth) - parsedText.length, this.component.paddingChar);
          }
          return parsedText.substring(index * parentWidth, (index + 1) * parentWidth);
        });
      return lines.join('\n');
    }
    const toComplete = parentWidth - parsedText.length;
    return pospend(parsedText, toComplete, this.component.paddingChar);
  }

  static merge(parent, component) {
    return Object.assign({}, parent, component, {
      width: parent.width,
      paddingLeft: (parent.paddingLeft || 0) + (component.paddingLeft || 0)
    });
  }
}

module.exports = Style;
