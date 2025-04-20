import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";


@Schema({timestamps: true})
export class Course extends Document
{
    @Prop({required:true})
    name:string;

    @Prop()
    description:string;

    @Prop({required:true})
    originalPrice:number;

    @Prop()
    discountPrice:number;

    @Prop({ required: true })
     updatedOn: number;

    @Prop()
    image:string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);