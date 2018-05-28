const Reasciit = require('../../');

describe('padding', () => {
	const reasciitRender = element => Reasciit.render(element, new Reasciit(40));

	it('should padding on top', () => {
		const renderedDiv = reasciitRender(<div
			style={{ paddingTop: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'                                        ',
			'My simple text                          '
		].join('\n'));
	});
	it('should padding on bottom', () => {
		const renderedDiv = reasciitRender(<div
			style={{ paddingBottom: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'My simple text                          ',
			'                                        '
		].join('\n'));
	});
	it('should padding on left', () => {
		const renderedDiv = reasciitRender(<div
			style={{ paddingLeft: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			' My simple text                         '
		].join('\n'));
	});
	it('should padding on right', () => {
		const renderedDiv = reasciitRender(<div
			style={{ paddingRight: 1, textAlign: 'right' }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'                         My simple text '
		].join('\n'));
	});
	it('should padding all sides', () => {
		const renderedDiv = reasciitRender(<div
			style={{ padding: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'                                        ',
			' My simple text                         ',
			'                                        '
		].join('\n'));
	});
});
