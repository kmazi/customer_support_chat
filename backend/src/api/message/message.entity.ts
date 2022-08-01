import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Conversation } from '../conversation/conversation.entity';
import { User } from '../user/user.entity';

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'text' })
    public body: string;

    @Column({ type: 'number' })
    senderId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'senderId' })
    public sender: User;

    @Column({ type: 'number' })
    receiverId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'receiverId' })
    public receiver: User;

    @Column({ type: 'number' })
    conversationId: number;

    @ManyToOne(() => Conversation)
    @JoinColumn({ name: 'conversationId' })
    public conversation: Conversation;

    /*
   * Create and Update Date Columns
   */

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}