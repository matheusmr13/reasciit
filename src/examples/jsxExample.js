/** @jsx Ascom.createElement */
const Ascom = require('./../dom');

const template = (order) => {
	const { merchant, shortReference, createdAt } = order;
	const {
		restaurantName,
		ordersCount,
		deliveryAddress: {
			formattedAddress,
			neighborhood,
			complement,
			reference,
			city,
			state,
			postalCode
		},
		items
	} = order;

	let taxPayerId = '';
	let changeDue = 0;

	if (order.customer.taxPayerIdentificationNumber) {
		taxPayerId = order.customer.taxPayerIdentificationNumber;
	}

	order.payments.forEach((payment) => {
		if (payment.changeFor && payment.changeFor > 0) {
			changeDue = payment.changeFor - order.totalPrice;
		}
	});

	const itemsToRender = items.map(item => (
		<div style={{ paddingBottom: 1 }}>
			<div style={{ display: 'inline-block', width: 5 }}>{item.quantity}</div>
			<div style={{ display: 'inline-block', width: 35 }}>
				<div>
					<div style={{ display: 'inline-block', width: 26 }}>{item.name}</div>
					<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>{item.totalPrice}</div>
				</div>
				{
					item.subItems && !!item.subItems.length && item.subItems.map(subitem => (
						<div>
							<div style={{ display: 'inline-block', width: 26 }}>{subitem.quantity} {subitem.name}</div>
							<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>{subitem.totalPrice}</div>
						</div>
					))
				}
			</div>
		</div>
	));
	return (
		<div style={{ paddingBottom: 4 }}>
			<div style={{ textAlign: 'center', borderTop: 1, paddingBottom: 1 }}>My Title</div>
			<div>Restaurante: {restaurantName}</div>
			<div style={{ paddingBottom: 1 }}>Pedido: {shortReference} Data {'asdad asdsad asdad'}</div>
			<div>Dados do cliente</div>
			<div>Nome: {restaurantName}</div>
			<div>Pedidos: {ordersCount} pedidos</div>
			<div>Endereço: {formattedAddress}</div>
			<div>Bairro: {neighborhood}</div>
			{ complement && <div>Comp: {complement}</div> }
			{ reference && <div>Ref: {reference}</div> }
			<div>Cidade: {city} - {state}</div>
			<div style={{ paddingBottom: 1 }}>CEP: {postalCode}</div>
			<div>Itens do Pedido</div>
			<div>
				<div style={{ display: 'inline-block', width: 5 }}>Qtd</div>
				<div style={{ display: 'inline-block', width: 26 }}>Item</div>
				<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>Preço</div>
			</div>
			{ ...itemsToRender }
			<div>
				<div style={{ display: 'inline-block', width: 9 }}> </div>
				<div style={{ display: 'inline-block', width: 31 }}>
					<div>
						<div style={{ display: 'inline-block', width: 22 }}>Sub-Total:</div>
						<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>R$ 28,00</div>
					</div>
					<div>
						<div style={{ display: 'inline-block', width: 22 }}>Taxa de Entrega:</div>
						<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>R$ 5,00</div>
					</div>
					<div style={{ borderBottom: 1 }}>
						<div style={{ display: 'inline-block', width: 22 }}>Desconto:</div>
						<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>-R$ 4,00</div>
					</div>
					<div>
						<div style={{ display: 'inline-block', width: 22 }}>Total:</div>
						<div style={{ display: 'inline-block', width: 9, textAlign: 'right' }}>R$ 14,00</div>
					</div>
				</div>
			</div>
			<div style={{ paddingTop: 1 }}>Forma de Pagamento</div>
			<div>
				{ order.paymentMethod }
			</div>
			{ (taxPayerId || changeDue) && <div style={{ paddingTop: 1 }}>Observacoes</div> }
			{
				taxPayerId && (
					<div>
						<div>INCLUIR CPF NA NOTA FISCAL</div>
						<div>CPF: {taxPayerId}</div>
					</div>
				)
			}
			{ changeDue && <div>Levar R$ 10,00 para o troco</div> }
		</div>
	);
};

module.exports = template;
