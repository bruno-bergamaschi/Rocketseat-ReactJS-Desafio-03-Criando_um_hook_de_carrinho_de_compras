import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

interface Product {
	id: number;
	title: string;
	price: number;
	image: string;
}

interface ProductFormatted extends Product {
	priceFormatted: string;
}

interface CartItemsAmount {
	[key: number]: number;
}

const Home = (): JSX.Element => {
	const [products, setProducts] = useState<ProductFormatted[]>([]);
	const { addProduct, cart } = useCart();

	console.log(cart);

	const cartItemsAmount = cart.reduce(
		(sumAmount, product) => {
			if (product.id === 1) {
				sumAmount[1] += product.amount;
			} else if (product.id === 2) {
				sumAmount[2] += product.amount;
			} else if (product.id === 3) {
				sumAmount[3] += product.amount;
			} else if (product.id === 4) {
				sumAmount[4] += product.amount;
			} else if (product.id === 5) {
				sumAmount[5] += product.amount;
			} else if (product.id === 6) {
				sumAmount[6] += product.amount;
			}

			return sumAmount;
		},
		{
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
		} as CartItemsAmount
	);

	useEffect(() => {
		async function loadProducts() {
			await api.get('products').then((response) => setProducts(response.data));
		}

		loadProducts();
	}, []);

	function handleAddProduct(id: number) {
		addProduct(id);
	}

	return (
		<ProductList>
			{products.map((product) => (
				<li key={product.id}>
					<img src={product.image} alt={product.title} />
					<strong>{product.title}</strong>
					<span>R$ {product.price}</span>
					<button
						type='button'
						data-testid='add-product-button'
						onClick={() => handleAddProduct(product.id)}
					>
						<div data-testid='cart-product-quantity'>
							<MdAddShoppingCart size={16} color='#FFF' />
							{cartItemsAmount[product.id] || 0}
						</div>

						<span>ADICIONAR AO CARRINHO</span>
					</button>
				</li>
			))}
		</ProductList>
	);
};

export default Home;
