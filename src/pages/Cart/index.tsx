import React from 'react';
import {
	MdDelete,
	MdAddCircleOutline,
	MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
	id: number;
	title: string;
	price: number;
	image: string;
	amount: number;
}

const Cart = (): JSX.Element => {
	const { cart, removeProduct, updateProductAmount } = useCart();

	const cartFormatted = cart.map((product) => ({
		...product,
		priceFormatted: formatPrice(product.price),
		subTotal: formatPrice(product.price * product.amount),
	}));
	const total = formatPrice(
		cart.reduce((sumTotal, product) => {
			return sumTotal + product.price * product.amount;
		}, 0)
	);

	function handleProductIncrement(product: Product) {
		updateProductAmount({ productId: product.id, amount: product.amount + 1 });
	}

	function handleProductDecrement(product: Product) {
		updateProductAmount({ productId: product.id, amount: product.amount - 1 });
	}

	function handleRemoveProduct(productId: number) {
		removeProduct(productId);
	}

	return (
		<Container>
			<ProductTable>
				<thead>
					<tr>
						<th aria-label='product image' />
						<th>PRODUTO</th>
						<th>QTD</th>
						<th>SUBTOTAL</th>
						<th aria-label='delete icon' />
					</tr>
				</thead>
				<tbody>
					{cartFormatted.map((produtc) => (
						<tr key={produtc.id} data-testid='product'>
							<td>
								<img src={produtc.image} alt={produtc.title} />
							</td>
							<td>
								<strong>{produtc.title}</strong>
								<span>R$ {produtc.price}</span>
							</td>
							<td>
								<div>
									<button
										type='button'
										data-testid='decrement-product'
										disabled={produtc.amount <= 1}
										onClick={() => handleProductDecrement(produtc)}
									>
										<MdRemoveCircleOutline size={20} />
									</button>
									<input
										type='text'
										data-testid='product-amount'
										readOnly
										value={produtc.amount}
									/>
									<button
										type='button'
										data-testid='increment-product'
										onClick={() => handleProductIncrement(produtc)}
									>
										<MdAddCircleOutline size={20} />
									</button>
								</div>
							</td>
							<td>
								<strong>R$ {produtc.subTotal}</strong>
							</td>
							<td>
								<button
									type='button'
									data-testid='remove-product'
									onClick={() => handleRemoveProduct(produtc.id)}
								>
									<MdDelete size={20} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</ProductTable>

			<footer>
				<button type='button'>Finalizar pedido</button>

				<Total>
					<span>TOTAL</span>
					<strong>R$ {total}</strong>
				</Total>
			</footer>
		</Container>
	);
};

export default Cart;
