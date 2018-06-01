const Reasciit = require('reasciit');

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
	it('should border all sides with extra width', () => {
		const renderedDiv = reasciitRender(<div
			style={{ border: 3 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'+--------------------------------------+',
			'|+------------------------------------+|',
			'||+----------------------------------+||',
			'|||My simple text                    |||',
			'||+----------------------------------+||',
			'|+------------------------------------+|',
			'+--------------------------------------+'
		].join('\n'));
	});
	it('should border all sides with different width on some side', () => {
		const renderedDiv = reasciitRender(<div
			style={{ border: 3, borderRight: 1 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'+---------------------------------------',
			'|+--------------------------------------',
			'||+------------------------------------+',
			'|||My simple text                      |',
			'||+------------------------------------+',
			'|+--------------------------------------',
			'+---------------------------------------'
		].join('\n'));
	});
	it('should border all sides with no width on some corner', () => {
		const renderedDiv = reasciitRender(<div
			style={{ border: 3, borderRight: 0, borderBottom: 0 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'+---------------------------------------',
			'|+--------------------------------------',
			'||+-------------------------------------',
			'|||My simple text                       '
		].join('\n'));
	});
	it('should border all sides with no width on oposite sides', () => {
		const renderedDiv = reasciitRender(<div
			style={{ border: 3, borderRight: 0, borderLeft: 0 }}>
				My simple text
		</div>);
		expect(renderedDiv).toEqual([
			'----------------------------------------',
			'----------------------------------------',
			'----------------------------------------',
			'My simple text                          ',
			'----------------------------------------',
			'----------------------------------------',
			'----------------------------------------'
		].join('\n'));
	});
	it('should border all sides after padding and before margin', () => {
		const renderedDiv = reasciitRender(<div
			style={{ border: 3, padding: 3, margin: 1 }}>
				My simple text with some breaking line
		</div>);
		expect(renderedDiv).toEqual([
			'                                        ',
			' +------------------------------------+ ',
			' |+----------------------------------+| ',
			' ||+--------------------------------+|| ',
			' |||                                ||| ',
			' |||                                ||| ',
			' |||                                ||| ',
			' |||   My simple text with some     ||| ',
			' |||   breaking line                ||| ',
			' |||                                ||| ',
			' |||                                ||| ',
			' |||                                ||| ',
			' ||+--------------------------------+|| ',
			' |+----------------------------------+| ',
			' +------------------------------------+ ',
			'                                        '
		].join('\n'));
	});
});
