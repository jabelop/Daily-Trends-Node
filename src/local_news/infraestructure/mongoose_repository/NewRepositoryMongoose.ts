import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewRepository } from '../../domain/NewRepository';
import { NewMongoose } from './NewMongoose';
import { Model } from 'mongoose';
import { New } from '../../domain/New';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class NewRepositoryMongoose implements NewRepository{

    constructor(@InjectModel(NewMongoose.name)
    private newModel: Model<NewMongoose>) {}

    
    async saveNew(localNew: New): Promise<boolean> {
        const createdNew = new this.newModel(localNew);
        if(await createdNew.save()) return true;
        return false;
    }

   async getNew(id: number): Promise<New> {
        return await this.newModel.findOne({id});
    }

    async getAllNews(): Promise<New[]> {
        return await this.newModel.find();
    }

   async  deleteNew(id: number): Promise<boolean> {
        const result: DeleteResult = await this.newModel.deleteOne({id});
        return result.deletedCount > 0;
    }


}