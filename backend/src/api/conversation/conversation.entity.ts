import { agent } from 'supertest';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Conversation{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'boolean', default: false})
    public closed: boolean;

    @Column({ type: 'text', nullable: false })
    public subject: string;

    @Column({ type: 'number', name: "customer_id", nullable: false })
    customerId: number;

    @ManyToOne(() => User, (customer) => customer.conversations)
    @JoinColumn({ name: 'customer_id' })
    public customer: User;

    @Column({ type: 'number', nullable: true})
    agentId: number;

    @ManyToOne(() => User, (agent) => agent.conversations)
    @JoinColumn({ name: 'agentId' })
    public agent: User;

    /*
   * Create and Update Date Columns
   */

    @CreateDateColumn({ type: 'timestamp', name: "created_at" })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}