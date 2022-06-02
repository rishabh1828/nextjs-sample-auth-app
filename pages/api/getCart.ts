import { query } from '../../services/db';

async function addItemToCart() {
    let queryString = `SELECT * FROM Cart`;
	const rows = await query(
		queryString
	);
  	return rows[0];
}

export default (req: any, res: any) => {
    return new Promise(async resolve => {
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
	});
}
