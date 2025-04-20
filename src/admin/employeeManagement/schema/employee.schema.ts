import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Employee extends Document
{
   @Prop({required:true})
   name:string;
   
   @Prop({required:true})
   email:string;

   @Prop({required:true})
   password:string;

   @Prop({required:true})
   city:string;

   @Prop({required:true})
   phoneno:number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);