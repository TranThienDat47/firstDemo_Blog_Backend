import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
   @PrimaryGeneratedColumn()
   _id: number;

   @Column({ nullable: false })
   token: string;

   @Column({ nullable: false })
   expiresAt: Date;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   updatedAt: Date;

   @ManyToMany(() => User)
   @JoinTable()
   users: User[];

   @BeforeInsert()
   @BeforeUpdate()
   updateDates() {
      this.updatedAt = new Date();
      this.expiresAt = new Date(this.updatedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
   }
}
