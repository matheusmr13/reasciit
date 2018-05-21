const jsxTemplate = require('./jsxExample');
const Ascom = require('./../dom');

const order = {
	id: 'ff808081622dff9601622ebc37c34b5e',
	reference: '7610424026991070',
	shortReference: '1234',
	createdAt: '2018-03-16T12:15:09.621Z',
	type: 'DELIVERY',
	restaurantName: 'My cool restaurant with big name that occupy two lines',
	paymentMethod: 'CARTAO',
	payments: [{
		value: 17,
		prepaid: true,
		changeFor: 100
	}],
	ordersCount: 20,
	customer: {
		name: 'My crazy client',
		taxPayerIdentificationNumber: '12345678909'
	},
	items: [{
		name: 'Burguer Atrevido que todos gostam',
		quantity: 2,
		price: 23.45,
		totalPrice: 46.9,
		observations: 'Please can you remove the onion on bottom.',
		subItems: [{
			name: 'Bem Passado mas de um jeito que todo mundo gosta',
			quantity: 1,
			totalPrice: 5.1
		}, {
			name: 'Batata Inclusa',
			quantity: 2,
			totalPrice: 2.1
	  	}]
	}, {
		name: 'Sorvete de morango',
		quantity: 3,
		price: 4.35,
		totalPrice: 13.05,
		observations: 'More chocolate.'
	}],
	subTotal: 59.95,
	totalPrice: 66,
	deliveryFee: 6.05,
	deliveryAddress: {
		formattedAddress: 'My street with a very very long name, 999',
		state: 'AC',
		city: 'My city',
		coordinates: {
			latitude: -9.824512,
			longitude: -67.950419
		},
		neighborhood: 'My neighborhood',
		postalCode: '12345678',
		complement: 'My complement'
	}
};


describe('asd', () => {
	it('should jsx', () => {
		const rendered = Ascom.render(jsxTemplate(order), new Ascom(40));
	});
});
