import { validate } from 'class-validator';
import { ResponseData } from './globalClass';
import { HttpMessage, HttpStatus } from './globalEnum';

export const validator = async (classDTO: any) => {
   const errors = await validate(classDTO);
   if (errors.length > 0) {
      const errorMessage = errors.map((error) => Object.values(error.constraints)).join(', ');
      const responseData = new ResponseData(
         false,
         null,
         HttpMessage.BAD_REQUEST + ` (${errorMessage})`,
         HttpStatus.BAD_REQUEST,
      );
      return { success: false, status: HttpStatus.BAD_REQUEST, responseData };
   }
   return { success: true };
};
