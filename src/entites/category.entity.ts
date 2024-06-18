import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
   @PrimaryGeneratedColumn()
   _id: number;

   @Column({ nullable: false })
   parentID: number;

   @Column({ nullable: false })
   title: string;

   @Column({ nullable: false })
   description: string;

   @OneToMany(() => Post, (post) => post.category)
   posts: Post[];
}
