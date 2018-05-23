const Reasciit = require('../../');

describe('border', () => {
	const reasciitRender = element => Reasciit.render(element, new Reasciit(40));

	it('should border on top', () => {
		const renderedDiv = reasciitRender(<div
			style={{ borderTop: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'----------------------------------------',
			'My simple text                          '
		].join('\n'));
	});
	it('should border on bottom', () => {
		const renderedDiv = reasciitRender(<div
			style={{ borderBottom: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'My simple text                          ',
			'----------------------------------------'
		].join('\n'));
	});
	it('should border on left', () => {
		const renderedDiv = reasciitRender(<div
			style={{ borderLeft: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'|My simple text                         '
		].join('\n'));
	});
	it('should border on right', () => {
		const renderedDiv = reasciitRender(<div
			style={{ borderRight: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'My simple text                         |'
		].join('\n'));
	});
	it('should border all sides', () => {
		const renderedDiv = reasciitRender(<div
			style={{ border: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'+--------------------------------------+',
			'|My simple text                        |',
			'+--------------------------------------+'
		].join('\n'));
	});
});
