import { query } from '../../services/db';

async function addItemToCart(data: any) {
    const { username, id, name, price, quantity } = data.cartDetails;
    let queryString = `INSERT INTO Cart VALUES ("${username}", ${id}, "${name}", ${price}, 1)`;
    if (!data.addItems) {
        queryString = `UPDATE Cart SET quantity = ${quantity} WHERE (username = "${username}") and (id = ${id})`;
    }
	const rows = await query(
		queryString
	);
  	return rows[0];
}

export default async (req: any, res: any) => {
	const { method } = req;
	try {
		switch (method) {
			case 'PUT':
				await addItemToCart(req.body);
				return res.status(200).json({
					success: true
				});

		}
	} catch (err) {
		console.error(err);
	}
}
