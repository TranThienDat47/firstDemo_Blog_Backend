import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Category {
   @PrimaryGeneratedColumn()
   _id: number;

   @Column({ nullable: false })
   title: string;

   @Column({ nullable: false })
   description: string;

   //after
   @ManyToOne(() => Category, (category) => category.children)
   @JoinColumn({ name: 'parentID' })
   parent: Category;

   @OneToMany(() => Category, (category) => category.parent)
   children: Category[];
}
