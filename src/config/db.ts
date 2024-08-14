// src/config/db.ts

import mysql from "mysql2/promise";
require('dotenv').config()
const port = process.env.DB_PORT;
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(port as any),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

export function executeQuery<T>(query: string, params: any[]): Promise<T> {
  return new Promise((resolve, reject) => {
    pool
      .query(query, params)
      .then((result) => {
        resolve(result[0] as any);
      })
      .catch((error) => {
        console.log("err", error)
        reject(new Error(`Error executing query: ${error.message}`));
      });
  });
}
