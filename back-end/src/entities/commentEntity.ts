import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  commentId: number

  @Column()
  postId: number

  @Column()
  commentUser: string

  @Column()
  comment: string

  @Column()
  @CreateDateColumn()
  createdTime: Date

  @Column()
  @UpdateDateColumn()
  updatedTime: Date
}
