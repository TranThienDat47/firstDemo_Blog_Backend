import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { MinLength } from 'class-validator';

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

   @OneToMany(() => Post, (post) => post.user)
   posts: Post[];
}
