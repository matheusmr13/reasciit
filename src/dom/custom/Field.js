const Element = require('./../elements/Element');
const Div = require('./../elements/Div');
const Span = require('./../elements/Span');

class Field extends Element {
	render() {
		const { label, value } = this.props;
		return new Div({
			children: [
				new Span({ children: label }),
				new Span({ children: value })
			]
		});
	}
}

module.exports = Field;
