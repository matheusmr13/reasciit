const Reasciit = require('reasciit');

describe('wordWrap', () => {
	const reasciitRender = element => Reasciit.renderToString(element, new Reasciit(40));

	const LONG_TEXT = 'My text that will probably breakthisline and then get to secondlineandif we continue maybe breaktoanotherand another line';
	it('should render long text breaking all characters', () => {
		const renderedDiv = reasciitRender(<div
			style={{ wordWrap: 'break-all' }}
		>
			{LONG_TEXT}
		</div>);
		expect(renderedDiv).toEqual([
			'My text that will probably breakthisline',
			' and then get to secondlineandif we cont',
			'inue maybe breaktoanotherand another lin',
			'e                                       '
		].join('\n'));
	});
	it('should render long breaking all words', () => {
		const renderedDiv = reasciitRender(<div
			style={{ wordWrap: 'break-word' }}
		>
			{LONG_TEXT}
		</div>);
		expect(renderedDiv).toEqual([
			'My text that will probably breakthisline',
			'and then get to secondlineandif we      ',
			'continue maybe breaktoanotherand another',
			'line                                    '
		].join('\n'));
	});
	it('should render long breaking all long words', () => {
		const renderedDiv = reasciitRender(<div
			style={{ wordWrap: 'break-word' }}
		>
			My textthat will probablybreakthislineandthengettosecondlineandif
			wecontinue maybebreaktoanotherandanother line
		</div>);
		expect(renderedDiv).toEqual([
			'My textthat will                        ',
			'probablybreakthislineandthengettosecondl',
			'ineandif wecontinue                     ',
			'maybebreaktoanotherandanother line      '
		].join('\n'));
	});
});
