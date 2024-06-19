import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdatePostDTO {
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

   @IsBoolean()
   isNew: boolean;

   @IsNotEmpty()
   reacts: number;

   @IsNotEmpty()
   countComments: number;

   @IsNotEmpty()
   views: number;

   @IsNotEmpty()
   keySearch: string;
}
