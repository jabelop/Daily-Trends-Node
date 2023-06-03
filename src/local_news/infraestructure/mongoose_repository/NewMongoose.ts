
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { New } from '../../domain/New';

export type NewDocument = HydratedDocument<New>;

@Schema({collection: "news"})
export class NewMongoose {
  @Prop()
  id?: number;

  @Prop()
  title?: string;

  @Prop()
  content!: string;

  @Prop()
  image!: string;
}

export const NewMongooseSchema = SchemaFactory.createForClass(NewMongoose);
