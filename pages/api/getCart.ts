import { query } from '../../services/db';

async function addItemToCart() {
    let queryString = `SELECT * FROM Cart`;
	const rows = await query(
		queryString
	);
  	return rows[0];
}

export default async (req: any, res: any) => {
	const { method } = req;
	try {
		switch (method) {
			case 'GET':
				const data = await addItemToCart();
				return res.status(200).json({
					success: true,
					data 
				});

		}
	} catch (err) {
		console.error(err);
	}
}
