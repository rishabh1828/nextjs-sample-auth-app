import Product from './Product';
import styles from '../styles/ShopPage.module.css';

export default function Shop({ products }: any) {
  return (
		<div className={styles.container}>
			<div className={styles.cards}>
				{products.map((product: any) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
