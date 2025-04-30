import { IsBoolean, IsNumber, IsString } from "class-validator";


export class UsersDto
{
    @IsString()
    name:string;

    @IsString()
    email:string;

    @IsString()
    city:string;

    @IsString()
    phoneno:number;

    @IsBoolean()
    ban_status:boolean;

    @IsNumber()
    password:number
}