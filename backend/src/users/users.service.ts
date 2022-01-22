import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { deserializeUser } from 'passport';

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}
@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    
    async findOne(email: string): Promise<User | undefined>{
        const firestore = new admin.firestore.Firestore();
        
        (await firestore.collection('user').get()).docs.map( data =>{
            this.users.push({
                id: data.get('id'),
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
            })
        })
        return this.users.find(user => user.email === email)
    }
}
