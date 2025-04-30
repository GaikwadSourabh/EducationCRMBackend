import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Inqury } from "./schema/inqury.schema";
import { Model } from "mongoose";
import { InquaryDto } from "./dto/inquary.dto";


@Injectable()
export class InquryService
{
    constructor(@InjectModel(Inqury.name) private InquryModel:Model<Inqury>){}

   async create(createInquryDto:InquaryDto):Promise<Inqury>
   {
      const  createInqury = new this.InquryModel(createInquryDto);
      return createInqury.save();
   }

   async findbyPhone(phoneno:string):Promise<Inqury[]>
   {
     return this.InquryModel.find({phoneno}).exec();
   }

   async finadAll():Promise<Inqury[]>
   {
    return this.InquryModel.find().exec();
   }

}