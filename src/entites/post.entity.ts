import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BeforeInsert,
   BeforeUpdate,
   ManyToOne,
   JoinColumn,
   ManyToMany,
   JoinTable,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Post {
   @PrimaryGeneratedColumn()
   _id: number;

   @Column({
      default: 'https://lh3.googleusercontent.com/d/1ZBkx0MXQcO2NSUtCeHfmqiZTkfQlVhxB=s220?authuser=0',
      nullable: false,
   })
   img: string;

   @Column({ nullable: false })
   name: string;

   @Column({ nullable: false })
   subName: string;

   @Column({ length: 2225, nullable: false })
   description: string;

   @Column({ type: 'longtext', nullable: false })
   content: string;

   @Column({ default: 'Bản nháp', nullable: false })
   status: string;

   @Column({ default: true, nullable: false })
   isNew: boolean;

   @Column({ default: 0, nullable: false })
   views: number;

   @Column({ default: 0, nullable: false })
   reacts: number;

   @Column({ default: 0, nullable: false })
   countComments: number;

   @Column({ default: '', nullable: false })
   keySearch: string;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   createdAt: Date;

   @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
   updatedAt: Date;

   //after
   @ManyToMany(() => Category)
   @JoinTable()
   categories: Category[];

   @ManyToMany(() => User)
   @JoinTable()
   users: User[];

   @ManyToMany(() => Post)
   @JoinTable()
   posts: Post[];

   @ManyToOne(() => User, (user) => user.posts, { nullable: false })
   @JoinColumn({
      name: 'userID',
   })
   user: User;

   @BeforeInsert()
   @BeforeUpdate()
   updateKeySearch() {
      this.updatedAt = new Date();

      if (!this.keySearch) {
         if (this.name || this.subName || this.description) {
            this.keySearch = `${this.name} ${this.subName} ${this.description}`;
         } else {
            this.keySearch = '';
         }
      }
   }
}
