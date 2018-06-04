import Element from 'ascii-dom/core/Element';

import div from 'ascii-dom/elements/Div';
import hr from 'ascii-dom/elements/Hr';
import span from 'ascii-dom/elements/Span';
import img from 'ascii-dom/elements/Img';
import input from 'ascii-dom/elements/Input';

const Component = require('./Component');

const Elements = {
	div,
	hr,
	span,
	img,
	input
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

	static renderToString(element, window, opts = {}) {
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

		return new (Elements[element])({
			...props,
			children: childrenProcessed
		});
	}

	static render(element) {
		process.stdout.on('resize', () => {
			Component.redraw();
		});
		Component.redraw = () => {
			process.stdout.write('\x1b[H\x1b[J');
			process.stdout.write(this.renderToString(element, new Reasciit(process.stdout.columns, process.stdout.rows)));
		};
		return new Promise(() => {
			Component.redraw();
		});
	}
}

module.exports = Reasciit;
