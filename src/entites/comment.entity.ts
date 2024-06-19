import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   OneToMany,
   ManyToOne,
   JoinColumn,
   ManyToMany,
   JoinTable,
   BeforeUpdate,
} from 'typeorm';
import { User } from './user.entity';
import { EditHistory } from './editHistory.entity';

@Entity()
export class Comment {
   @PrimaryGeneratedColumn({})
   _id: number;

   @Column({ nullable: false })
   content: string;

   @Column({ nullable: false })
   dateOfBirth: Date;

   @Column({ default: true, nullable: false })
   isReply: boolean;

   @Column({ default: 0, nullable: false })
   countReacts: number;

   @Column({ default: 0, nullable: false })
   countReolies: number;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   createdAt: Date;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   updatedAt: Date;

   //after
   @ManyToOne(() => User, (user) => user.comments)
   @JoinColumn({ name: 'userID' })
   user: User;

   @ManyToOne(() => Comment, (comment) => comment.children)
   @JoinColumn({ name: 'parentID' })
   parent: Comment;

   @OneToMany(() => Comment, (comment) => comment.parent)
   children: Comment[];

   @OneToMany(() => EditHistory, (editHistory) => editHistory.comment)
   editHistories: EditHistory[];

   @ManyToMany(() => User)
   @JoinTable()
   comments: Comment[];

   @BeforeUpdate()
   updateDates() {
      this.updatedAt = new Date();
   }
}
