import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Navbar.module.css';
import {
    setLogout,
} from '../middleware/utils';
import { useEffect, useRef } from 'react';

function handleOnClickLogout(e: any) {
    setLogout(e);
}

export default function Navbar() {
	const cart = useSelector((state: any) => state.cart);
	const user = useSelector((state: any) => state.user);
	const prevRef = useRef() as any;

	useEffect(() => {
		if (prevRef.current && cart.length) {
			if (prevRef.current.length === cart.length) {
				cart.forEach((cartData: any) => {
					updateCart(false, cartData);
				});
			} else if (prevRef.current.length < cart.length) {
				updateCart(true, cart[cart.length - 1]);
			}
		}
		prevRef.current = cart;
	}, [cart]);

	async function updateCart(addItems: boolean, cardData: any) {
		await fetch('http://localhost:3000/api/cart', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({cartDetails: {...cardData, ...user}, addItems})
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	const getItemsCount = () => {
		return cart.reduce((accumulator: number, item: any) => accumulator + item.quantity, 0);
	};

	return (
		<nav className={styles.navbar}>
			<ul className={styles.links}>
				<li className={styles.navlink}>
					<Link href="/">Home</Link>
				</li>
				<li className={styles.navlink}>
					<Link href="/cart">
						<p>Cart ({getItemsCount()})</p>
					</Link>
				</li>
				<li className={styles.navlink}>
					<a href="#" onClick={e => handleOnClickLogout(e)}>Logout</a>
				</li>
			</ul>
		</nav>
	);
};
