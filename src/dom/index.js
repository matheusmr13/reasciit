const fs = require('fs');
const Element = require('./elements/Element');

const DOM = {
	div: require('./elements/Div'),
	hr: require('./elements/Hr'),
	span: require('./elements/Span'),
	img: require('./elements/Img')
};

class Ascom {
	constructor(columns) {
		this.columns = columns;
		this.promisesToLoad = [];
	}

	addPromiseToLoad(promise) {
		this.promisesToLoad.push(promise);
	}

	static render(element, window, opts = {}) {
		if (!(element instanceof Element)) {
			throw new Error('You must pass and element to render');
		}
		const renderedElements = element.render(window, {
			width: window.columns
		}).map(line => line.join('')).join('\n');

		Promise.all(window.promisesToLoad).then(() => {
			if (opts.onLoad) {
				const result = element.render(window, {
					width: window.columns
				}).map(line => line.join('')).join('\n');
				opts.onLoad(result);
			}
		}).catch((err) => {
			if (opts.onError) {
				opts.onError(err);
			}
		});

		return renderedElements;
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

	static createElement(element, props, ...children) {
		const childrenProcessed = children
			.filter(child => !!child)
			.reduce((reduced, actual) => {
				if (actual['0']) {
					return [
						...reduced,
						...Object.values(actual)
					];
				}
				if (actual instanceof Element) {
					return [
						...reduced,
						actual
					];
				}
				return [
					...reduced,
					actual.toString()
				];
			}, []);

		return new (DOM[element])({
			...props,
			children: childrenProcessed
		});
	}
}

module.exports = Ascom;
