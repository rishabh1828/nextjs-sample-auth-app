import { query } from '../../services/db';

async function getProducts() {
	const rows = await query(
		'SELECT * FROM All_Games'
	);
  	return rows[0];
}

export default async  (req: any, res: any) => {
	const { method } = req;
	try {
		switch (method) {
			case 'GET':
				const products = await getProducts();
				return res.status(200).json({
					success: true,
					products
				});

		}
	} catch (err) {
		console.error(err);
	}
}
