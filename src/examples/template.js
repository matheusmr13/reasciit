const Span = require('./../dom/elements/Span');
const Hr = require('./../dom/elements/Hr');
const Field = require('./../dom/custom/Field');
const Div = require('./../dom/elements/Div');
const Ascom = require('./../dom');

const template = (order, columns) => {
	const {
		title,
		subtitle,
		description,
		client,
		date,
		items,
		observation
	} = this.order;

	return Ascom.render(new Div({
		style: {
			width: columns
		},
		children: [
			new Hr(),
			new Div({
				children: title,
				style: {
					textAlign: 'center',
					paddingBottom: 1
				}
			}),
			new Field('Client', client),
			new Field('Now', date),
			new Span('Some random'),
			new Span('text'),
			new Span('together and inline'),
			new Div({
				children: 'Items',
				style: {
					paddingTop: 1
				}
			})
			// new Table({

			// })
			// new Line().children(new Span('Qtt', 6), new Span('Name', this.columns - 15), new Span('Price', 9).withStyle({ textAlign: 'right' })),
			// invoiceItems,
			// new Div().withStyle({ paddingLeft: 12 })
			//   .children(
			//     new Separator(),
			//     new Field('Items total', formatMoney(10)).withStyle({ justifyContent: 'space-between' }),
			//     new Field('Delivery Fee', formatMoney(20)).withStyle({ justifyContent: 'space-between' }),
			//     new Separator('-'),
			//     new Field('To pay', formatMoney(30)).withStyle({ justifyContent: 'space-between' })
			//   ),
		]
	}));
};

module.exports = template;
