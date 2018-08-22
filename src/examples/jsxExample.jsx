import Reasciit from './../../build';

// const Reasciit = require('../../src').default;

const template = (order) => {
	const {
		id,
		restaurantName,
		deliveryFee,
		address: {
			street,
			number,
			neighborhood,
			reference,
			city,
			state
		},
		items
	} = order;

	const itemsToRender = items.map(item => (
		<div style={{ paddingBottom: 1 }}>
			<div style={{ display: 'inline-block', width: 5 }}>{item.quantity}</div>
			<div style={{ display: 'inline-block', width: 35 }}>
				<div>
					<div style={{ display: 'inline-block', width: 26 }}>{item.name}</div>
					<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>$ {item.totalPrice}</div>
				</div>
				{
					item.subItems && !!item.subItems.length && item.subItems.map(subitem => (
						<div>
							<div style={{ display: 'inline-block', width: 26 }}>{subitem.quantity} {subitem.name}</div>
							<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>$ {subitem.totalPrice}</div>
						</div>
					))
				}
			</div>
		</div>
	));

	const total = items.reduce((parcial, item) => parcial + item.totalPrice, 0);
	return (
		<div style={{ paddingBottom: 2 }}>
			<div style={{ textAlign: 'center', borderTop: 1, paddingBottom: 1 }}>Order: {id}</div>
			<div>Restaurant: {restaurantName}</div>

			<div>Client address: {street}, {number} - {neighborhood}, {city} - {state}</div>
			{ reference && <div>Reference: {reference}</div> }
			<div>Cidade: {city} - {state}</div>
			<div style={{ paddingTop: 1 }}>Items</div>
			<div>
				<div style={{ display: 'inline-block', width: 5 }}>Qtt</div>
				<div style={{ display: 'inline-block', width: 26 }}>Description</div>
				<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>Price</div>
			</div>
			{ ...itemsToRender }
			<div>
				<div style={{ display: 'inline-block', width: 9 }} />
				<div style={{ display: 'inline-block', width: 31 }}>
					<div>
						<div style={{ display: 'inline-block', width: 22 }}>Parcial:</div>
						<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>$ {total}</div>
					</div>
					<div>
						<div style={{ display: 'inline-block', width: 22 }}>Delivery fee:</div>
						<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>$ {deliveryFee}</div>
					</div>
					<div style={{ borderTop: 1 }}>
						<div style={{ display: 'inline-block', width: 22 }}>Total:</div>
						<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>$ {total + deliveryFee}</div>
					</div>
				</div>
			</div>
			<div style={{ paddingTop: 1 }}>Payment method</div>
			<div>{ order.paymentMethod }</div>
		</div>
	);
};

module.exports = template;
