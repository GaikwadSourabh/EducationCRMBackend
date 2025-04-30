import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";


export class FeedbackDto
{
    @IsString()
    @IsNotEmpty()
    user_name:string

    @IsString()
    @IsNotEmpty()
    user_email:string

    @IsString()
    @IsNotEmpty()
    user_feedback:string

    @IsBoolean()
    read_status:boolean

    @IsDate()
    date_of_feedback:Date
}