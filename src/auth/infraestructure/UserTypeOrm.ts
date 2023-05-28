
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../domain/User';

@Entity('users')
export class UserTypeOrm implements User{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar', { length: 50, nullable: false })
    username!: string;

    @Column('varchar', { length: 256, nullable: false })
    password!: string;

}
