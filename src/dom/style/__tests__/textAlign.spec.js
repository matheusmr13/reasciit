const Element = require('../../elements/Element');
const Reasciit = require('../../');

describe('textAlign', () => {
	const reasciitWindow = new Reasciit(40);
	const reasciitRender = element => Reasciit.render(element, reasciitWindow);
	const render = (style, children) => reasciitRender(new Element({
		children,
		style
	}));

	describe('short text', () => {
		const SHORT_TEXT = 'My text';
		it('should render simple text in left', () => {
			const renderedDiv = render({
				textAlign: 'left'
			}, SHORT_TEXT);
			expect(renderedDiv).toEqual('My text                                 ');
		});
		it('should render simple text in center', () => {
			const renderedDiv = render({
				textAlign: 'center'
			}, SHORT_TEXT);
			expect(renderedDiv).toEqual('                 My text                ');
		});
		it('should render simple text in right', () => {
			const renderedDiv = render({
				textAlign: 'right'
			}, SHORT_TEXT);
			expect(renderedDiv).toEqual('                                 My text');
		});
	});
	describe('long text with break word', () => {
		const LONG_TEXT = 'My text that will probably breakthisline and then get to secondlineandif we continue maybe breaktoanotherand another line';
		it('should render long text in left', () => {
			const renderedDiv = render({
				textAlign: 'left'
			}, LONG_TEXT);
			expect(renderedDiv).toEqual([
				'My text that will probably breakthisline',
				'and then get to secondlineandif we      ',
				'continue maybe breaktoanotherand another',
				'line                                    '
			].join('\n'));
		});
		it('should render long text in center', () => {
			const renderedDiv = render({
				textAlign: 'center'
			}, LONG_TEXT);
			expect(renderedDiv).toEqual([
				'My text that will probably breakthisline',
				'   and then get to secondlineandif we   ',
				'continue maybe breaktoanotherand another',
				'                  line                  '
			].join('\n'));
		});
		it('should render long text in right', () => {
			const renderedDiv = render({
				textAlign: 'right'
			}, LONG_TEXT);
			expect(renderedDiv).toEqual([
				'My text that will probably breakthisline',
				'      and then get to secondlineandif we',
				'continue maybe breaktoanotherand another',
				'                                    line'
			].join('\n'));
		});
	});
});
