const Div = require('../Div');
const Ascom = require('../../');

describe('Div', () => {
	const ascomWindow = new Ascom(40);
	const renderDivWithStyle = (style, children = 'My text') => Ascom.render(
		new Div({
			children,
			style
		}),
		ascomWindow
	);
	it('should render correctly', () => {
		const renderedDiv = renderDivWithStyle();
		expect(renderedDiv).toEqual('My text                                 ');
	});
	it('should render correctly', () => {
		const renderedDiv = renderDivWithStyle({
			textAlign: 'center'
		});
		expect(renderedDiv).toEqual('                 My text                ');
	});
	it('should render correctly', () => {
		const renderedDiv = renderDivWithStyle({}, 'My text that will probably break this line and then get to second line');
		expect(renderedDiv).toEqual([
			'My text that will probably break this li',
			'ne and then get to second line          '
		].join('\n'));
	});
});