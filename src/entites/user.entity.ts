import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeUpdate } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Notification } from './notitfication.entity';

@Entity()
export class User {
   @PrimaryGeneratedColumn({})
   _id: number;

   @Column({ nullable: false })
   firstName: string;

   @Column({ nullable: false })
   lastName: string;

   @Column({ nullable: false })
   dateOfBirth: Date;

   @Column({ type: 'varchar', nullable: false })
   email: string;

   @Column({ type: 'varchar', nullable: false })
   password: string;

   @Column({ default: true, nullable: false })
   isVerify: boolean;

   @Column({ default: false, nullable: false })
   isAdmin: boolean;

   @CreateDateColumn({ nullable: false })
   createdAt: Date;

   @CreateDateColumn({ nullable: false })
   updatedAt: Date;

   //after
   @OneToMany(() => Post, (post) => post.user, { cascade: true })
   posts: Post[];

   @OneToMany(() => Comment, (comment) => comment.user)
   comments: Comment[];

   @OneToMany(() => Notification, (notification) => notification.user)
   notifications: Notification;

   @OneToMany(() => Notification, (notification) => notification.userSend)
   sendNotifications: Notification;

   @BeforeUpdate()
   updateDates() {
      this.updatedAt = new Date();
   }
}
