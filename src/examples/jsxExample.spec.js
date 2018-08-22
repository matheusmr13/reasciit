import Reasciit from './../../build';
import jsxTemplate from './jsxExample';

const order = {
	id: '1234',
	restaurantName: 'My cool restaurant with big name that occupy two lines',
	paymentMethod: 'MONEY',
	items: [{
		name: 'Big Hamburger with huge amount of cheese',
		quantity: 2,
		totalPrice: 46.9,
		observations: 'Please can you remove the onion on bottom.',
		subItems: [{
			name: 'Some extra cheese and sauce',
			quantity: 1,
			totalPrice: 5.1
		}, {
			name: 'Fries',
			quantity: 2,
			totalPrice: 2.1
		}]
	}, {
		name: 'Ice cream',
		quantity: 3,
		totalPrice: 13.05,
		observations: 'More chocolate.'
	}],
	deliveryFee: 6.05,
	address: {
		street: 'My street with a very very long name',
		number: '999',
		state: 'AC',
		city: 'My city',
		neighborhood: 'My neighborhood'
	}
};


describe('Invoice example', () => {
	it('should match jsx based on object', () => {
		const rendered = Reasciit.renderToString(jsxTemplate(order), new Reasciit(40));
		expect(rendered).toMatchSnapshot();
	});
});
