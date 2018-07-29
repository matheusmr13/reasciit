
const Element = require('ascii-dom/core/Element');
// const imageToAscii = require('image-to-ascii');

class Img extends Element {
	render(window, parent) {
		const { style, children, src } = this.props;
		if (children && children.length) {
			throw new Error('Image element does not support children');
		}

		if (this.loadedImg) {
			return this.loadedImg.split('\n').map(line => line.split(''));
		}

		// TODO maybe use asciify ?

		window.addPromiseToLoad(new Promise((resolve, reject) => {
			// console.info(style.width, parent.width);
			// The path can be either a local path or an url
			// imageToAscii(src, {
			// 	size: {
			// 		width: 20
			// 	},
			// 	fg: false,
			// 	pixels: '.,:;i1tfLCG08 '
			// }, (err, converted) => {
			// 	if (err) {
			// 		reject(err);
			// 		return;
			// 	}
			// 	this.loadedImg = converted;

			// 	resolve(converted);
			// });
		}));

		return Array(style.height).fill(Array(style.width).fill(' '));
	}
}

export default Img;
