const Ascom = require('./../dom');
const Span = require('./../dom/elements/Span');
const Hr = require('./../dom/elements/Hr');
const Field = require('./../dom/custom/Field');
const Div = require('./../dom/elements/Div');

const template = ({ order, columns }) => {
	const {
		title,
		subtitle,
		description,
		client,
		date,
		observation
	} = order;

	return Ascom.render(new Div({
		style: {
			width: columns
		},
		children: [
			// new Hr(),
			new Div({
				children: title,
				style: {
					textAlign: 'center'
				}
			}),
			// new Div({ children: subtitle }),
			// new Div({ children: description }),
			// new Field('Client', client),
			// new Field('Now', date),
			// new Span('Some random'),
			// new Span('text'),
			// new Span('together and inline'),
			// new Div({
			// 	children: 'Items',
			// 	style: {
			// 		paddingTop: 1
			// 	}
			// }),
			// new Field('Obs', observation)
		]
	}), new Ascom(20));
};

module.exports = template;
