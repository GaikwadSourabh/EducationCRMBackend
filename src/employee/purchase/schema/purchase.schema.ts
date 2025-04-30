import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Purchase extends  Document
{
   
    @Prop({required:true})
    course_name:string;

    @Prop({required:true})
    course_amount:number;

    @Prop({required:true})
    user_email:string;

    @Prop({default:Date.now})
    date_of_purchase:Date

    @Prop({required:true})
    payment_id:string;

    @Prop({required:true})
    order_id:string;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);