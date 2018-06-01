const Reasciit = require('reasciit');

describe('textAlign', () => {
	const render = element => Reasciit.renderToString(element, new Reasciit(40));
	const LONG_TEXT = 'My text that will probably breakthisline and then get to secondlineandif we continue maybe breaktoanotherand another line';
	const SHORT_TEXT = 'My text';

	describe('left', () => {
		it('should render simple text in left', () => {
			const renderedDiv = render(<div style={{ textAlign: 'left' }}>
				{SHORT_TEXT}
			</div>);
			expect(renderedDiv).toEqual('My text                                 ');
		});
		it('should render long text in left', () => {
			const renderedDiv = render(<div style={{ textAlign: 'left' }}>
				{LONG_TEXT}
			</div>);
			expect(renderedDiv).toEqual([
				'My text that will probably breakthisline',
				'and then get to secondlineandif we      ',
				'continue maybe breaktoanotherand another',
				'line                                    '
			].join('\n'));
		});
	});
	describe('center', () => {
		it('should render simple text in center', () => {
			const renderedDiv = render(<div style={{ textAlign: 'center' }}>
				{SHORT_TEXT}
			</div>);
			expect(renderedDiv).toEqual('                 My text                ');
		});
		it('should render long text in center', () => {
			const renderedDiv = render(<div style={{ textAlign: 'center' }}>
				{LONG_TEXT}
			</div>);
			expect(renderedDiv).toEqual([
				'My text that will probably breakthisline',
				'   and then get to secondlineandif we   ',
				'continue maybe breaktoanotherand another',
				'                  line                  '
			].join('\n'));
		});
	});
	describe('right', () => {
		it('should render simple text in right', () => {
			const renderedDiv = render(<div style={{ textAlign: 'right' }}>
				{SHORT_TEXT}
			</div>);
			expect(renderedDiv).toEqual('                                 My text');
		});
		it('should render long text in right', () => {
			const renderedDiv = render(<div style={{ textAlign: 'right' }}>
				{LONG_TEXT}
			</div>);
			expect(renderedDiv).toEqual([
				'My text that will probably breakthisline',
				'      and then get to secondlineandif we',
				'continue maybe breaktoanotherand another',
				'                                    line'
			].join('\n'));
		});
	});
	describe('multiple values', () => {
		it('should render child element in center with different alignments on child', () => {
			const renderedDiv = render(<div style={{ textAlign: 'center' }}>
				<div style={{ width: 20 }}>
					My text with two lines
				</div>
				<div style={{ width: 20, textAlign: 'center' }}>
					My text with two lines
				</div>
				<div style={{ width: 20, textAlign: 'right' }}>
					My text with two lines
				</div>
			</div>);
			expect(renderedDiv).toEqual([
				'          My text with two              ',
				'          lines                         ',
				'            My text with two            ',
				'                  lines                 ',
				'              My text with two          ',
				'                         lines          '
			].join('\n'));
		});
	});
});
