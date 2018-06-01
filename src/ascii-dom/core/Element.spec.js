import Element from 'ascii-dom/core/Element';

class MyCustomElement extends Element {
	static defaultStyle = {
		paddingLeft: 1,
		display: 'inline'
	}
}

describe('Element', () => {
	describe('merging style', () => {
		it('should merge style correctly', () => {
			const myCustomElement = new MyCustomElement({
				style: {
					paddingLeft: 2,
					paddingBottom: 3
				}
			});
			expect(myCustomElement.props.style).toMatchObject({
				paddingBottom: 3,
				paddingLeft: 2,
				display: 'inline'
			});
		});
	});
});
