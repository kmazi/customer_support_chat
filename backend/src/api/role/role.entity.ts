import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Unique("UQ_names", ["name"])
export class Role{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', length: 120 })
    public name: string;

    @OneToMany(() => User, (user) => user.role)
    public users: User[];

    /*
   * Create and Update Date Columns
   */

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}