import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Timestamp } from 'typeorm';
import { Conversation } from '../conversation/conversation.entity';
import { User } from '../user/user.entity';

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'text', nullable: false })
    public body: string;

    @Column({ type: 'number', nullable: false })
    customerId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'customerId' })
    public customer: User;

    @Column({ type: 'number', nullable: true })
    agentId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'agentId' })
    public agent: User;

    @Column({ type: 'number', nullable: false })
    conversationId: number;

    @ManyToOne(() => Conversation)
    @JoinColumn({ name: 'conversationId' })
    public conversation: Conversation;

    /*
   * Create and Update Date Columns
   */

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Timestamp;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Timestamp;
}