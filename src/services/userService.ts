// src/services/dbService.ts

import { executeQuery } from "../config/db";
import bcrypt from "bcrypt";
const moment = require("moment")


export class UserService {
  
  async loginUser(email: string, password: string): Promise<any> {
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    const checkParams = [email];

    // Check if the email already exists in the database
    const existingUser = await executeQuery<any[]>(checkQuery, checkParams);
    
    if (existingUser.length == 0) {
      return {
        status: 400,
        message: "Email not found",
        result: null,
      };
    }

    // If the email is unique, proceed with registration
    // Check if the user with the provided email exists
    const userQuery = "SELECT * FROM users WHERE email = ? limit 1";
    const userParams = [email];
    const qdata = await executeQuery<any[]>(userQuery, userParams);
    
    if (qdata.length === 0) {
      return {
        status: 401,
        message: "Invalid Credentials",
        result: null, // Assuming email is unique and fetchQuery returns an array of users (should be one user)
      };
    }

    let user = qdata[0];
    // // Verify the password using bcrypt
    // const match = password == user.password; // bcrypt.compare(password, user[0].password);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return {
        status: 401,
        message: "Invalid Credentials",
        result: null, // Assuming email is unique and fetchQuery returns an array of users (should be one user)
      };
    }

    // // Return the stored user
    return {
      status: 200,
      message: "Login successful",
      result: user, // Assuming email is unique and fetchQuery returns an array of users (should be one user)
    }; //
  }
}
