const Div = require('../Div');
const Ascom = require('../../');

describe('div', () => {
	it('should render correctly', () => {
		const renderedDiv = Ascom.render(new Div({
			children: 'My text'
		}));
		expect(renderedDiv).toEqual('My text');
	});
});