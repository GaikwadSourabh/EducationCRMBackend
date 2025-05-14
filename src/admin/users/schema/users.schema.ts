import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Matches } from "class-validator";
import { Document } from "mongoose";




@Schema()
export class Users extends Document
{
    @Prop({required:true})
    name:string;

    @Prop({required:true,default: false })
    ban_status:boolean;

    @Prop({required:true})
    city:string;

    @Prop({required:true})
    email:string;

    @Prop({required:true})
    password:string;


   
      @Prop({required:true})

    phoneno:number;

}

export const UsersSchema = SchemaFactory.createForClass(Users);