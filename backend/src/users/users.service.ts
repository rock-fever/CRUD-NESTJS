import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}
@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id:1,
            name: 'Amit',
            username: 'rock',
            password:'rock',
        },
        {
            id:2,
            name: 'Ajay',
            username: 'roll',
            password:'roll',
        },
    ];

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username === username)
    }
}
