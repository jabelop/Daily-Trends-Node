import { Repository } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../src/auth/domain/User';
import { UserRepository } from '../../../src/auth/domain/UserRepository';

@Injectable()
export class UserRepositoryTest implements UserRepository {
    users: User[] = [
        { id: 1, username: "test1", password: "test1Password" }, 
        { id: 2, username: "test2", password: "test2Password" }
    ]
    constructor() { }


    async saveUser(user: User): Promise<boolean> {
        if (user.username.length > 1 && 
            user.username.length < 50 && 
            user.password.length > 6 && 
            user.password.length < 256)
            return true;
        return false;
    }

    async getUser(username: string): Promise<User | null> {
        return this.users.find((user) => user.username === username);
    }

    async deleteUser(id: number): Promise<boolean> {
        return true;
    }


}