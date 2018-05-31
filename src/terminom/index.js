const Element = require('terminom/core/Element');

const DOM = {
	div: require('terminom/elements/Div'),
	hr: require('terminom/elements/Hr'),
	span: require('terminom/elements/Span'),
	img: require('terminom/elements/Img')
};

class Terminom {
	constructor(columns, rows) {
		this.columns = columns;
		this.rows = rows;
		this.promisesToLoad = [];
	}

	addPromiseToLoad(promise) {
		this.promisesToLoad.push(promise);
	}

	static render(element, window, opts = {}) {
		if (!(element instanceof Element)) {
			throw new Error('You must pass an element to render');
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

module.exports = Terminom;
