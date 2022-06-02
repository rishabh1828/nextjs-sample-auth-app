import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/store';
import styles from '../styles/Product.module.css';

export default function Product({ product }: any) {
	const user = useSelector((state: any) => state.user);
	const cart = useSelector((state: any) => state.cart);
  	const dispatch = useDispatch();

	async function addItems() {
		dispatch(addToCart(product));
		await fetch('http://localhost:3000/api/cart', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({...product, ...user}),
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	return (
		<div>
			<Image src='/game.svg' height="200" width="150"/>
			<h4 className={styles.title}>{product.name}</h4>
			<p>₹ {product.price}</p>
			<button
				onClick={() => dispatch(addToCart(product))}
				className={styles.button}>
				Add to Cart
			</button>
		</div>
	);
};
