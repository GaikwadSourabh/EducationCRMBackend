import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class EmpOrder extends Document
{

    @Prop()
    employee_email:string;

    @Prop()
    order_id:string;


}

export const  EmpSchema = SchemaFactory.createForClass(EmpOrder);