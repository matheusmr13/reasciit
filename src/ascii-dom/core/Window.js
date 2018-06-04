import Focusable from 'ascii-dom/core/Focusable';
import Element from 'ascii-dom/core/Element';

const getFocusableChildren = (element) => {
	const focusableFromChildren = (element.props.children || [])
		.filter(child => child instanceof Element)
		.map(child => getFocusableChildren(child));

	const focusableElements = element.props.children
		.filter(child => child instanceof Focusable);


	return focusableElements.concat(focusableFromChildren.reduce((reduced, act) => [
		...reduced,
		...act
	], []));
};

class Window {
	constructor(stdout, stdin) {
		this.stdout = stdout;
		this.stdin = stdin;
		this.focusedElement = null;
		this.focusableElements = [];
		this.tabIndex = -1;
		this.width = this.stdout.columns;
		this.heigth = this.stdout.rows;
	}

	elementsToString() {
		if (!(this.body instanceof Element)) {
			throw new Error('You must pass an element to render');
		}
		const renderedElements = this.body.render(this, this).map(line => line.join('')).join('\n');

		return renderedElements;
	}

	clear() {
		this.stdout.write('\x1b[H\x1b[J');
		return this;
	}

	redraw() {
		this.clear();
		this.stdout.write(this.elementsToString(this.body, this));
	}

	onChangeFocus() {
		this.focusedElement.blur();
		this.tabIndex = this.tabIndex + 1;
		if (this.tabIndex >= this.focusableElements.length) {
			this.tabIndex = 0;
		}
		this.focusedElement = this.focusableElements[this.tabIndex];
		this.focusedElement.setFocus();
	}

	render(element) {
		this.body = element;
		this.focusableElements = getFocusableChildren(element);

		this.focusableElements[0].setFocus();
		this.tabIndex = 0;
		this.focusedElement = this.focusableElements[0];
		this.stdin.setRawMode(true);
		this.stdin.resume();
		this.stdin.setEncoding('utf8');
		this.stdin.on('data', (key) => {
			if (key === '\u0003') {
				process.exit(0);
			}
			if (key === '\t') {
				this.onChangeFocus();
				this.redraw();
				return;
			}
			this.focusedElement.sendEvent({
				type: 'key',
				key
			});
		});

		this.stdout.on('resize', () => {
			this.redraw();
		});
		this.redraw();
		return new Promise(() => {});
	}
}

export default Window;
