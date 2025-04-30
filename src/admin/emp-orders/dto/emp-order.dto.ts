import { IsString } from "class-validator";


export class empOrderDto
{
    @IsString()
    employee_email:string;

    @IsString()
    order_id:string;
}