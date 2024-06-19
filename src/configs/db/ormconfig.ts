import { DataSource } from 'typeorm';
import { User } from '~entites/user.entity';
import { Post } from '~entites/post.entity';
import { Category } from '~entites/category.entity';
import { Comment } from '~entites/comment.entity';
import { Token } from '~/entites/token.entity';
import { Notification } from '~entites/notitfication.entity';
import { EditHistory } from '~entites/editHistory.entity';

export const AppDataSource = new DataSource({
   type: 'mysql',
   host: 'localhost',
   port: 3306,
   username: 'root',
   password: '',
   database: 'firstdemo_blog',
   synchronize: true,
   logging: false,
   entities: [User, Post, Category, Comment, Token, Notification, EditHistory],
   migrations: ['src/migration/*.ts'],
   subscribers: ['src/subscriber/*.ts'],
});
