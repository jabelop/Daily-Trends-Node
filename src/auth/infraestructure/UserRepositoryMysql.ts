import { DeleteResult, Repository } from 'typeorm';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeOrm } from './UserTypeOrm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryMysql implements UserRepository{

    constructor(@InjectRepository(UserTypeOrm)
    private usersRepository: Repository<UserTypeOrm>) {}


    async saveUser(user: UserTypeOrm): Promise<boolean> {
        let savedUser:UserTypeOrm = await this.usersRepository.save(user);
        if (savedUser) return true;
        return false;
    }

    async getUser(username: string): Promise<User | null> {
        
        return await this.usersRepository.findOne({where: {username}});
    }

    getRepository(): Repository<UserTypeOrm> {
        return this.usersRepository;
    }

    async deleteUser(id: number): Promise<boolean> {
        const result: DeleteResult = await this.usersRepository.delete({id});
        return result.affected > 0;
    }


}