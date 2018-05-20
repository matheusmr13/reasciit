const Div = require('../Div');
const Ascom = require('../../');

describe('Div', () => {
	const ascomWindow = new Ascom(40);
	it('should render correctly', () => {
		const renderedDiv = Ascom.render(
			new Div({ children: 'My text' }),
			ascomWindow
		);
		expect(renderedDiv).toEqual(
			'My text                                 '
		);
	});
	it('should render correctly', () => {
		const renderedDiv = Ascom.render(
			new Div({
				children: 'My text',
				style: {
					textAlign: 'center'
				}
			}),
			ascomWindow
		);
		expect(renderedDiv).toEqual(
			'                 My text                '
		);
	});
});