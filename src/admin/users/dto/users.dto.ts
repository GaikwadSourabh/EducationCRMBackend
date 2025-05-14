import { IsBoolean, IsNumber, IsString, Matches } from "class-validator";


export class UsersDto
{
    @IsString()
    name:string;

    @IsString()
    email:string;

    @IsString()
    city:string;

     @Matches(/^\d{10}$/, {
            message: 'Phone must be exactly 10 digits',
          })
    phoneno:number;

    @IsBoolean()
    ban_status: boolean = false;

    @IsString()
    password:string;
}