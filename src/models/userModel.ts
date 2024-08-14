// src/models/userModel.ts

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
  }
  
  const users: User[] = [];
  
  export default users;
  