import { IsNumber, IsString } from "class-validator";

export class EmployeeDto
{
    @IsString()
    name:string;

    @IsString()
    email:string;

    @IsString()
    password:string;

    @IsNumber()
    phoneno:number;

    @IsString()
    city:string;
}