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
	it('should render simple text completing remaining columns', () => {
		const renderedDiv = renderDivWithStyle();
		expect(renderedDiv).toEqual('My text                                 ');
	});
	it('should render simple text in center', () => {
		const renderedDiv = renderDivWithStyle({
			textAlign: 'center'
		});
		expect(renderedDiv).toEqual('                 My text                ');
	});
	it('should render long text completing remaining columns on last line', () => {
		const renderedDiv = renderDivWithStyle({
			wordWrap: 'break-all'
		}, 'My text that will probably break this line and then get to second line and if we continue maybe break to another and another line');
		expect(renderedDiv).toEqual([
			'My text that will probably break this li',
			'ne and then get to second line and if we',
			' continue maybe break to another and ano',
			'ther line                               ',
		].join('\n'));
	});
	it('should render long text in center', () => {
		const renderedDiv = renderDivWithStyle({
			textAlign: 'center',
			wordWrap: 'break-all'
		}, 'My text that will probably break this line and then get to second line and if we continue maybe break to another and another line');
		expect(renderedDiv).toEqual([
			'My text that will probably break this li',
			'ne and then get to second line and if we',
			' continue maybe break to another and ano',
			'                ther line               ',
		].join('\n'));
	});
	it('should render long text breaking words when needed', () => {
		const renderedDiv = renderDivWithStyle({}, 'My text that will probably break this line and then get to second line and if we continue maybe break to another and another line');
		expect(renderedDiv).toEqual([
			'My text that will probably break this   ',
			'line and then get to second line and if ',
			'we continue maybe break to another and  ',
			'another line                            ',
		].join('\n'));
	});
	it('should render long text with long words breaking words when needed', () => {
		const renderedDiv = renderDivWithStyle({}, 'My text that will probably breakthisline and then get to secondlineandif we continue maybe breaktoanotherand another line');
		expect(renderedDiv).toEqual([
			'My text that will probably breakthisline',
			'and then get to secondlineandif we      ',
			'continue maybe breaktoanotherand another',
			'line                                    ',
		].join('\n'));
	});
});