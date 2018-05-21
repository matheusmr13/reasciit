const jsxTemplate = require('./jsxExample');
const Ascom = require('./../dom');

describe('asd', () => {
	it('should jsx', () => {
		console.info(Ascom.render(jsxTemplate(), new Ascom(40)));
	});
});
