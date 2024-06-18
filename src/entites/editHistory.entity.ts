import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, JoinColumn, ManyToOne } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class EditHistory {
   @PrimaryGeneratedColumn()
   _id: number;

   @Column({ nullable: false })
   oldContent: string;

   @Column({ nullable: false })
   newContent: string;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   createdAt: Date;

   //after
   @ManyToOne(() => Comment, (comment) => comment.editHistories)
   @JoinColumn({ name: 'commentID' })
   comment: Comment;
}
