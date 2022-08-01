import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Conversation{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'boolean', default: false})
    public closed: boolean;

    @Column({ type: 'text' })
    public subject: string;

    @Column({ type: 'number' })
    userId: number;

    @ManyToOne(() => User, (user) => user.conversations)
    @JoinColumn({ name: 'userId' })
    public user: User;

    /*
   * Create and Update Date Columns
   */

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}