import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export enum PostStatusType {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  postId: number

  @Column()
  userName: string

  @Column()
  postQuestion: string

  @Column({
    type: 'enum',
    enum: PostStatusType,
    default: PostStatusType.PENDING
  })
  postStatus: string

  @Column()
  postFeedback: string

  @Column()
  @CreateDateColumn()
  createdTime: Date

  @Column()
  @UpdateDateColumn()
  updatedTime: Date
}
