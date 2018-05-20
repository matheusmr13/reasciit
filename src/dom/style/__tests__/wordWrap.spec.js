const Element = require('../../elements/Element');
const Ascom = require('../../');

describe('wordWrap', () => {
	const ascomWindow = new Ascom(40);
	const ascomRender = element => Ascom.render(element, ascomWindow);
	const render = (style, children) => ascomRender(new Element({
		children,
		style
	}));

	const LONG_TEXT = 'My text that will probably breakthisline and then get to secondlineandif we continue maybe breaktoanotherand another line';
	it('should render long text breaking all characters', () => {
		const renderedDiv = render({
			wordWrap: 'break-all'
		}, LONG_TEXT);
		expect(renderedDiv).toEqual([
			'My text that will probably breakthisline',
			' and then get to secondlineandif we cont',
			'inue maybe breaktoanotherand another lin',
			'e                                       '
		].join('\n'));
	});
	it('should render long breaking all words', () => {
		const renderedDiv = render({
			wordWrap: 'break-word'
		}, LONG_TEXT);
		expect(renderedDiv).toEqual([
			'My text that will probably breakthisline',
			'and then get to secondlineandif we      ',
			'continue maybe breaktoanotherand another',
			'line                                    '
		].join('\n'));
	});
});
