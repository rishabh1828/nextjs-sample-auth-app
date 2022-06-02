const mysql = require('mysql2/promise');
const config = require('../config');

export async function query(sql: string, params?: any) {
	const connection = await mysql.createConnection(config.db);
	const results = await connection.execute(sql, params);
	return results;
}
