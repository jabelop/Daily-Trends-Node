
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { New } from '../domain/New';

@Entity('news')
export class NewTypeOrm implements New{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar', { length: 120, nullable: false })
    title?: string;

    @Column('text', { nullable: false })
    content!: string;

    @Column('varchar', { length: 250, nullable: false })
    image!: string;
}
