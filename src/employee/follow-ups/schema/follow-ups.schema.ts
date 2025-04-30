import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class FollowUps extends Document
{
    @Prop()
    phoneno:string;

    @Prop()
    empEmail:string;

    @Prop()
    followUpDate:string;
}

export const FollowUpsSchema = SchemaFactory.createForClass(FollowUps);