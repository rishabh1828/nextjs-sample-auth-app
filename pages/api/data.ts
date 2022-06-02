import { query } from '../../services/db';

async function getProducts() {
	const rows = await query(
		'SELECT * FROM All_Games'
	);
  	return rows[0];
}

export default (req: any, res: any) => {
    return new Promise(async resolve => {
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
	});
}
