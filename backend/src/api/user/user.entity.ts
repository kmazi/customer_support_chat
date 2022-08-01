import { urlencoded } from 'express';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Conversation } from '../conversation/conversation.entity';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 15})
  public phone: string;

  @Column({ type: 'number', nullable: false })
  public roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "roleId"})
  public role: Role;

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  public conversations: Conversation[]

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}