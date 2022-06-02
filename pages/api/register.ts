import { query } from '../../services/db';

async function registerUser(data: any) {
    const { username, password, name } = data;
	const rows = await query(
		`INSERT INTO All_Users VALUES ("${name}", "${username}", "${password}")`
	);
  	return rows[0];
}

export default (req: any, res: any) => {
    return new Promise(async resolve => {
        const { method } = req;
        try {
            switch (method) {
                case 'PUT':
					await registerUser(req.body);
					return res.status(200).json({
						success: true
					});

			}
		} catch (err) {
			console.error(err);
		}
	});
}
