import { IsNotEmpty, ValidateNested } from 'class-validator';

export class CreatePostDTO {
   @IsNotEmpty()
   userID: number;

   @IsNotEmpty()
   img: string;

   @IsNotEmpty()
   name: string;

   @IsNotEmpty()
   subName: string;

   @IsNotEmpty()
   description: string;

   @IsNotEmpty()
   content: string;

   @IsNotEmpty()
   status: string;

   @IsNotEmpty()
   keySearch: string;
}
