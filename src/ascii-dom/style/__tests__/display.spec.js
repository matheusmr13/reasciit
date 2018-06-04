const Reasciit = require('reasciit');
const Element = require('ascii-dom/core/Element');

describe('display', () => {
	const reasciitRender = element => Reasciit.renderToString(element, new Reasciit(40));

	describe('block', () => {
		it('should render block inside block', () => {
			const element = (
				<div
					style={{
						width: 40,
						display: 'block'
					}}
				>
					<div style={{
						textAlign: 'center',
						display: 'block',
						width: 20
					}}
					>
						My text that will probably break this line
					</div>
				</div>
			);
			const renderedDiv = reasciitRender(element);
			expect(renderedDiv).toEqual([
				'  My text that will                     ',
				' probably break this                    ',
				'        line                            '
			].join('\n'));
		});
		it('should render blocks inside block', () => {
			const renderedDiv = reasciitRender(new Element({
				children: [
					new Element({
						children: 'My text that will probably break this line',
						style: {
							display: 'block',
							width: 15
						}
					}),
					new Element({
						children: 'My other text that will break this line',
						style: {
							display: 'block',
							width: 15
						}
					})
				],
				style: {
					width: 40,
					display: 'block'
				}
			}));
			expect(renderedDiv).toEqual([
				'My text that                            ',
				'will probably                           ',
				'break this line                         ',
				'My other text                           ',
				'that will break                         ',
				'this line                               '
			].join('\n'));
		});
	});
	describe('inline-block', () => {
		it('should render inline-blocks aside', () => {
			const renderedDiv = reasciitRender(new Element({
				children: [
					new Element({
						children: 'My ',
						style: {
							display: 'inline-block',
							width: 20
						}
					}),
					new Element({
						children: 'text.',
						style: {
							display: 'inline-block',
							width: 20
						}
					})
				],
				style: {
					display: 'block'
				}
			}));
			expect(renderedDiv).toEqual([
				'My                  text.               '
			].join('\n'));
		});
		it('should render inline-blocks on two different lines', () => {
			const renderedDiv = reasciitRender(new Element({
				children: [
					new Element({
						children: 'My ',
						style: {
							display: 'inline-block',
							width: 20
						}
					}),
					new Element({
						children: 'text.',
						style: {
							display: 'inline-block',
							width: 21
						}
					})
				],
				style: {
					display: 'block'
				}
			}));
			expect(renderedDiv).toEqual([
				'My                                      ',
				'text.                                   '
			].join('\n'));
		});
		it('should render divs on many lines respecting width bounds', () => {
			const renderedDiv = reasciitRender(new Element({
				children: [
					new Element({
						children: 'My text at right that will occupy many lines',
						style: {
							display: 'inline-block',
							width: 10
						}
					}),
					new Element({
						children: 'My other text that will break only one line',
						style: {
							display: 'inline-block',
							width: 30
						}
					})
				],
				style: {
					display: 'block'
				}
			}));
			expect(renderedDiv).toEqual([
				'My text atMy other text that will break ',
				'right thatonly one line                 ',
				'will                                    ',
				'occupy                                  ',
				'many lines                              '
			].join('\n'));
		});
	});
	// it('should render divs inline', () => {
	// 	const renderedDiv = reasciitRender(new Div({
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
