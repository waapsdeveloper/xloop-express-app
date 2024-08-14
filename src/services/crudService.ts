import moment from "moment";
import 'moment-timezone';
import { executeQuery } from "../config/db";

export const list = (table: string) => {
  return new Promise(async (resolve) => {
    const userQuery = `SELECT * FROM ${table}`;
    const userParams: any = [];
    const qdata = await executeQuery<any[]>(userQuery, userParams);
    let list = qdata;
    resolve(list);
  });
};

export const add = (table: string, params: any) => {
  return new Promise(async (resolve) => {

    params['created_at'] =  moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss');
    params['updated_at'] =  moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss');

    const insertQuery = `INSERT INTO ${table} SET ?`;
    try {
      const result = (await executeQuery(insertQuery, params)) as any;
      const res = result;
      const id = parseInt(res["insertId"]);
      const item = await byId(table, id);
      resolve(item);
    } catch (error) {
      console.log(error);
      resolve(null);
    }
  });
};




export const byId = (table: string, id: any) => {
  return new Promise(async (resolve, reject) => {
    const selectQuery = `SELECT * FROM ${table} WHERE id = ?`;
    try {
      const result = (await executeQuery(selectQuery, [id])) as any;
      if (result.length > 0) {
        resolve(result[0]); // Assuming the query returns one record
      } else {
        resolve(null); // If no record is found
      }
    } catch (error) {
      console.log(error);
      resolve(null); // If no record is found
    }
  });
};

export const edit = (table: string, id: any, params: any) => {
  return new Promise(async (resolve, reject) => {
    const updateQuery = `UPDATE ${table} SET ? WHERE id = ?`;
    try {
      const result = (await executeQuery(updateQuery, [params, id])) as any;
      if (result && result.affectedRows > 0) {
        // If at least one row was affected, fetch and return the updated record
        const updatedRecord = await byId(table, id);
        resolve(updatedRecord);
      } else {
        // Handle the case where no rows were affected (e.g., ID not found)
        resolve(null);
      }
    } catch (error) {
      resolve(null);
    }
  });
};

export const drop = (table: string, id: any) => {
  return new Promise(async (resolve, reject) => {
    const deleteQuery = `DELETE FROM ${table} WHERE id = ?`;
    try {
      const result = (await executeQuery(deleteQuery, [id])) as any;
      if (result[0].affectedRows > 0) {
        resolve({ success: true, message: "Record deleted successfully" });
      } else {
        resolve({
          success: false,
          message: "Record not found or already deleted",
        });
      }
    } catch (error) {
      console.log(error);
      resolve({
        success: false,
        message: "Record not found or already deleted",
      });
    }
  });
};

export const genericQuery = (query: string, params: any[]): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const qdata = await executeQuery<any[]>(query, params);
      resolve(qdata);
    } catch (error) {
      reject(error);
    }
  });
};


export const listByPage = (table: string, limit: number, offset: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userQuery = `SELECT * FROM ${table} LIMIT ? OFFSET ?`;
      const userParams: any = [limit, offset];
      const qdata = await executeQuery<any[]>(userQuery, userParams);
      resolve(qdata);
    } catch (error) {
      reject(error);
    }
  });
};













