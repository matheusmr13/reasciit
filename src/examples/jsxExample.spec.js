const jsxTemplate = require('./jsxExample');
const Ascom = require('./../dom');
// const asciify = require('asciify-image');

const options = {
	fit: 'box',
	width: 200,
	height: 100
};


describe('asd', () => {
	it('should jsx', (done) => {
		Ascom.render(jsxTemplate(), new Ascom(40), {
			onLoad: (result) => {
				console.info(result);
				done();
			},
			onError: (err) => {
				console.info(err);
				done();
			}
		}, done);
	});
	// it('should render', (done) => {
	// 	asciify('/home/matheusmr/Pictures/pp.jpeg', options)
	// 		.then((asciified) => {
	// 			console.info('aeho');
	// 			console.info(asciified);
	// 			done();
	// 		})
	// 		.catch((err) => {
	// 			// Print error to console
	// 			console.error(err);
	// 			done();
	// 		});
	// });
});
