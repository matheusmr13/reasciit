const template = require('./template');

const order = {
	title: 'My order',
	subtitle: 'Subtitle',
	description: 'This is an order made by a very special client',
	client: 'Client name',
	date: '10/10/1995',
	observation: 'A observation to this invoice'
};

describe('Template example', () => {
	it('should render template corretly', () => {
		const rendered = template({ order, columns: 20 });
		console.info(rendered);
	});
});
