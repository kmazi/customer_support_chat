import { urlencoded } from 'express';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Unique } from 'typeorm';
import { Conversation } from '../conversation/conversation.entity';
import { Role } from '../role/role.entity';

@Entity()
@Unique("UQ_name_and_phone", ["name", "phone"])
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 15})
  public phone: string;

  @Column({ type: 'number', name: "role_id", nullable: false })
  public roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id"})
  public role: Role;

  @OneToMany(() => Conversation, (conversation) => conversation.customer)
  public conversations: Conversation[]

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}