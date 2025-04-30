import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Timestamp } from "mongodb";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Inqury extends Document
{

    @Prop({required:true})
    phoneno:string;

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    interestedCourse:string;

    @Prop({required:true})
    discussion:string;

    @Prop({required:true})
    inquiryType:string;

    @Prop({required:true})
    callType:string;

    @Prop({required:true})
    status:string

    @Prop()
    empEmail:string;

    @Prop({default: new Date()})
    dateOfInquiry: Date;

}

export const InqurySchema = SchemaFactory.createForClass(Inqury);