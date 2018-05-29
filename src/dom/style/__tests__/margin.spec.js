const Reasciit = require('../../');

describe('margin', () => {
	const reasciitRender = element => Reasciit.render(element, new Reasciit(40));

	it('should margin on top', () => {
		const renderedDiv = reasciitRender(<div
			style={{ marginTop: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'                                        ',
			'My simple text                          '
		].join('\n'));
	});
	it('should margin on bottom', () => {
		const renderedDiv = reasciitRender(<div
			style={{ marginBottom: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'My simple text                          ',
			'                                        '
		].join('\n'));
	});
	it('should margin on left', () => {
		const renderedDiv = reasciitRender(<div
			style={{ marginLeft: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			' My simple text                         '
		].join('\n'));
	});
	it('should margin on right', () => {
		const renderedDiv = reasciitRender(<div
			style={{ marginRight: 1, textAlign: 'right' }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'                         My simple text '
		].join('\n'));
	});
	it('should margin all sides', () => {
		const renderedDiv = reasciitRender(<div
			style={{ margin: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'                                        ',
			' My simple text                         ',
			'                                        '
		].join('\n'));
	});
});
