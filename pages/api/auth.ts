import jwt from 'jsonwebtoken';
import { query } from '../../services/db';

/* JWT secret key */
// const KEY = process.env.JWT_KEY;
const KEY = 'secretOrKeyJWTRandom';

async function getUser() {
    const rows = await query(
		`SELECT * FROM All_Users`
	);
  	return rows[0];
}

export default (req: any, res: any) => {
    return new Promise(async resolve => {
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
                   
                    const users = await getUser();
                    const user = users.find((user1: any) => {
                        return user1.username === username;
                    });
                    if (!user) {
                        return res.status(400).json({ status: 'error', error: 'User Not Found' });
                    }
                    const userId = user.id,
                        userEmail = user.username,
                        userPassword = user.password;
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
    });
};
