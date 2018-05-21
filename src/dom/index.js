const fs = require('fs');
const Element = require('./elements/Element');

const DOM = {
	div: require('./elements/Div'),
	hr: require('./elements/Hr'),
	span: require('./elements/Span')
};

class Ascom {
	constructor(columns) {
		this.columns = columns;
	}

	static render(element, window) {
		if (!(element instanceof Element)) {
			throw new Error('You must pass and element to render');
		}
		return element.render({
			width: window.columns
		}).map(line => line.join('')).join('\n');
	}

	static save(file) {
		return new Promise((resolve, reject) => {
			fs.writeFile(file, this.toString(), (err) => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		});
	}

	static createElement(element, props, children) {
		return new (DOM[element])({
			...props,
			children
		});
	}
}

module.exports = Ascom;
