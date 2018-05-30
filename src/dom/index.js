const Element = require('./elements/Element');
const Component = require('./../interaction/Component');

const DOM = {
	div: require('./elements/Div'),
	hr: require('./elements/Hr'),
	span: require('./elements/Span'),
	img: require('./elements/Img')
};

class Reasciit {
	constructor(columns, rows) {
		this.columns = columns;
		this.rows = rows;
		this.promisesToLoad = [];
	}

	addPromiseToLoad(promise) {
		this.promisesToLoad.push(promise);
	}

	static render(element, window, opts = {}) {
		if (!(element instanceof Element) && !(element instanceof Component)) {
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
				if (actual instanceof Element || actual.constructor === Component) {
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

		if (element.prototype instanceof Component) {
			return new element({
				...props,
				children: childrenProcessed
			});
		}

		return new (DOM[element])({
			...props,
			children: childrenProcessed
		});
	}

	static createApp(element) {
		// console.info(element);
		Component.redraw = () => {
			console.info(this.render(element, new Reasciit(process.stdout.columns, process.stdout.rows)));
		};
		return new Promise(() => {
			Component.redraw();
		});
	}
}

module.exports = Reasciit;
