import jwt from 'jsonwebtoken';
import { query } from '../../services/db';

/* JWT secret key */
const KEY: any = process.env.JWT_KEY;

async function getUser(username: string) {
    const rows = await query(
		`SELECT * FROM All_Users WHERE username="${username}"`
	);
  	return rows[0];
}

export default async (req: any, res: any) => {
    const { method } = req;
    try {
        switch (method) {
            case 'POST':
                const { username, password } = req.body;
                if (!username || !password) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'Missing username or password',
                    });
                }
                
                const user = await getUser(username);
                if (!user.length) {
                    return res.status(400).json({ status: 'error', error: 'User Not Found' });
                }
                const userId = user.id,
                    userEmail = user[0].username,
                    userPassword = user[0].password;
                if (password === userPassword) {
                    const payload = {
                        id: userId,
                        username: userEmail,
                        password: userPassword,
                    };
                    jwt.sign(payload, KEY, {
                            expiresIn: 3600,
                        }, (err: any, token: any) => {
                            return res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    );
                } else {
                return res.status(400)
                    .json({ status: 'error', error: 'Password incorrect' });
                }
            break;
        }
    } catch (error) {
        throw error;
    }
};
