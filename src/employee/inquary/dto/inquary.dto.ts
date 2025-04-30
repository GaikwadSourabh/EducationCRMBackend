import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class InquaryDto 
{
    @IsString()
    @IsNotEmpty()
    phoneno: string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    interestedCourse:string;

    @IsString()
    @IsNotEmpty()
    discussion:string;

    @IsString()
    @IsNotEmpty()
    inquiryType:string;

    @IsString()
    @IsNotEmpty()
    callType:string;

    @IsString()
    @IsNotEmpty()
    status:string;

    @IsString()
    empEmail?:string;

    dateOfInquiry?:Date;
}
