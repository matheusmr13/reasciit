const Div = require('../Div');
const Ascom = require('../../');

describe('Div', () => {
	const ascomWindow = new Ascom(40);
	const ascomRender = element => Ascom.render(element, ascomWindow);
	const renderDivWithStyle = (style, children = 'My text') => ascomRender(new Div({
		children,
		style
	}));

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
	it('should render long text breaking words when needed', () => {
		const renderedDiv = renderDivWithStyle({}, 'My text that will probably break this line and then get to second line and if we continue maybe break to another and another line');
		expect(renderedDiv).toEqual([
			'My text that will probably break this   ',
			'line and then get to second line and if ',
			'we continue maybe break to another and  ',
			'another line                            '
		].join('\n'));
	});
	it('should render long text with long words breaking words when needed', () => {
		const renderedDiv = renderDivWithStyle({}, 'My text that will probably breakthisline and then get to secondlineandif we continue maybe breaktoanotherand another line');
		expect(renderedDiv).toEqual([
			'My text that will probably breakthisline',
			'and then get to secondlineandif we      ',
			'continue maybe breaktoanotherand another',
			'line                                    '
		].join('\n'));
	});
	it('should render long centered text with long words breaking words when needed', () => {
		const renderedDiv = renderDivWithStyle({
			textAlign: 'center'
		}, 'My text that will probably breakthisline and then get to secondlineandif we continue maybe breaktoanotherand another line');
		expect(renderedDiv).toEqual([
			'My text that will probably breakthisline',
			'   and then get to secondlineandif we   ',
			'continue maybe breaktoanotherand another',
			'                  line                  '
		].join('\n'));
	});
	it('should render long text completing remaining columns on last line', () => {
		const renderedDiv = renderDivWithStyle({
			wordWrap: 'break-all'
		}, 'My text that will probably break this line and then get to second line and if we continue maybe break to another and another line');
		expect(renderedDiv).toEqual([
			'My text that will probably break this li',
			'ne and then get to second line and if we',
			' continue maybe break to another and ano',
			'ther line                               '
		].join('\n'));
	});
	it('should render long text completing remaining columns on last line', () => {
		const renderedDiv = renderDivWithStyle({
			width: 10
		}, 'My text at right that will occupy many lines');
		expect(renderedDiv).toEqual([
			'My text at                              ',
			'right that                              ',
			'will                                    ',
			'occupy                                  ',
			'many lines                              '
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
			'                ther line               '
		].join('\n'));
	});
	it('should render div inside div', () => {
		const renderedDiv = ascomRender(new Div({
			children: new Div({
				children: 'My text that will probably break this line',
				style: {
					textAlign: 'center'
				}
			}),
			style: {
				width: 20
			}
		}));
		expect(renderedDiv).toEqual([
			'  My text that will                     ',
			' probably break this                    ',
			'        line                            '
		].join('\n'));
	});

	it('should render divs aside', () => {
		const renderedDiv = ascomRender(new Div({
			children: [
				new Div({
					children: 'My ',
					style: {
						display: 'inline-block',
						width: 20
					}
				}),
				new Div({
					children: 'text.',
					style: {
						display: 'inline-block',
						width: 20
					}
				})
			]
		}));
		expect(renderedDiv).toEqual([
			'My                  text.               '
		].join('\n'));
	});
	it('should render divs on two different lines', () => {
		const renderedDiv = ascomRender(new Div({
			children: [
				new Div({
					children: 'My ',
					style: {
						display: 'inline-block',
						width: 20
					}
				}),
				new Div({
					children: 'text.',
					style: {
						display: 'inline-block',
						width: 21
					}
				})
			]
		}));
		expect(renderedDiv).toEqual([
			'My                                      ',
			'text.                                   '
		].join('\n'));
	});


	it('should render divs on many lines respecting width bounds', () => {
		const renderedDiv = ascomRender(new Div({
			children: [
				new Div({
					children: 'My text at right that will occupy many lines',
					style: {
						display: 'inline-block',
						width: 10
					}
				}),
				new Div({
					children: 'My other text that will break only one line',
					style: {
						display: 'inline-block',
						width: 30
					}
				})
			]
		}));
		expect(renderedDiv).toEqual([
			'My text atMy other text that will break ',
			'right thatonly one line                 ',
			'will                                    ',
			'occupy                                  ',
			'many lines                              '
		].join('\n'));
	});
	// it('should render divs inline', () => {
	// 	const renderedDiv = ascomRender(new Div({
	// 		children: [
	// 			new Div({
	// 				children: 'My ',
	// 				style: 'inline'
	// 			}),
	// 			new Div({
	// 				children: 'text',
	// 				style: 'inline'
	// 			}),
	// 			new Div({
	// 				children: 'inline',
	// 				style: 'inline'
	// 			})
	// 		]
	// 	}));
	// 	expect(renderedDiv).toEqual([
	// 		'My textthat'
	// 	].join('\n'));
	// });
});
