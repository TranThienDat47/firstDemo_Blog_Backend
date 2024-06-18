import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
   @PrimaryGeneratedColumn()
   _id: number;

   @Column({ nullable: false })
   refID: number;

   @Column({ nullable: false })
   title: string;

   @Column({ nullable: false })
   content: string;

   @Column({ default: false, nullable: false })
   isRead: boolean;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   createdAt: Date;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   updatedAt: Date;

   //after
   @ManyToOne(() => User, (user) => user.notifications)
   @JoinColumn({ name: 'userID' })
   user: User;

   @ManyToOne(() => User, (user) => user.sendNotifications)
   @JoinColumn({ name: 'userSendID' })
   userSend: User;

   @BeforeUpdate()
   updateDates() {
      this.updatedAt = new Date();
   }
}
