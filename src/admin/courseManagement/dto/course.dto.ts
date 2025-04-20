import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CourseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()  
  description: string;

  @IsNumber()
  originalPrice: number;

  @IsNumber()
  @IsOptional()  
  discountPrice: number;

  @IsString()
  updatedOn: string;  

  @IsString()
  image: string;
}
