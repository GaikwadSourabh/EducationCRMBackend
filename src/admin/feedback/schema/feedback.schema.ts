import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Feedback extends Document
{
   @Prop({required:true})
   user_name:string;

   @Prop({required:true})
   user_email:string;

   @Prop({required:true})
   user_feedback:string;

   @Prop({required:true,default:false})
   read_status:boolean;

   @Prop()
   date_of_feedback:Date;

   @Prop()
   city:string;
}

export const FeedBackSchema = SchemaFactory.createForClass(Feedback);