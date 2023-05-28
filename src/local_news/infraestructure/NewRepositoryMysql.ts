import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NewRepository } from '../domain/NewRepository';
import { New } from '../domain/New';
import { NewTypeOrm } from './NewTypeOrm';

@Injectable()
export class NewRepositoryMysql implements NewRepository{

    constructor(@InjectRepository(NewTypeOrm)
    private newRepository: Repository<NewTypeOrm>) {}

    
    async saveNew(localNew: New): Promise<boolean> {
        let savedNew: NewTypeOrm = await this.newRepository.save(localNew);
        if (savedNew) return true;
        return false;
    }

   async getNew(id: number): Promise<New> {
        return await this.newRepository.findOne({where: {id}});
    }

    async getAllNews(): Promise<New[]> {
        return await this.newRepository.find();
    }

   async  deleteNew(id: number): Promise<boolean> {
        const result: DeleteResult= await this.newRepository.delete({id});
        return result.affected > 0;
    }


   


}