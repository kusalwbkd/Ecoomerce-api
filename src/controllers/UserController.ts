import { Request, Response } from 'express';
import { db } from '../db/index.js'
import { usersTable } from '../db/UserSchema.js';
import { count, eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateUserToken = (user: any) => {
   return jwt.sign({ userId: user.id, role: user.role }, 'your-secret', {
     expiresIn: '30d',
   });
 };

export async function createUser(req:Request,res:Response){
   try {
    const{email}=req.body
    const [user]=await db.select().from(usersTable).where(eq(usersTable.email,email))
    if(user){
       res.status(404).json('Email already exists')
    }else{
      const [countUsers]=await db.select({value:count(usersTable.email)}).from(usersTable)
      const isAdminUser = countUsers.value == 0;
      req.body.role = isAdminUser ? 'admin' : 'user';
     req.body.password = await bcrypt.hash(req.body.password, 10);
      const [newUser] = await db.insert(usersTable).values(req.body).returning({
         id:usersTable.id,
         email:usersTable.email,
         role:usersTable.role,
         address:usersTable.address,
         name:usersTable.name
      });
      const token = generateUserToken(newUser);

      res.status(201).json({ user, token });
     
     
    }
    
   } catch (error) {
      res.status(500).send(error);
   }
}

export async function loginUser(req:Request,res:Response){
   const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, req.body.email));
    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const matched = await bcrypt.compare(req.body.password, user.password);
    if (!matched) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }
    const token = generateUserToken(user);
      // @ts-ignore
      delete user.password;
      res.status(200).json({ token, user });
}