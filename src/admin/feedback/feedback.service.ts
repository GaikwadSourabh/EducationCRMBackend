import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Feedback } from "./schema/feedback.schema";
import { Model } from "mongoose";
import { FeedbackDto } from "./dto/feedback.dto";

@Injectable()
export class FeedbackService
{

    constructor(@InjectModel(Feedback.name) private FeedbackModel:Model<Feedback>){}

    async create(data:FeedbackDto):Promise<Feedback>
    {
      return this.FeedbackModel.create(data);
    }

    async findAll(page=1,limit=5):Promise<{data:Feedback[],total:number}>
    {
     const skip=(page-1)*limit;
     const [data,total]=await Promise.all([
       this.FeedbackModel.find().skip(skip).limit(limit).exec(),
       this.FeedbackModel.countDocuments()
     ])
     return {data,total}
    }

    async updateBanStatus(id:string,status:boolean):Promise<Feedback>
    {
        const updatedFeedback = await this.FeedbackModel.findByIdAndUpdate(id, { read_status : status }, { new: true }).exec();
        if (!updatedFeedback) {
            throw new Error(`Feedback with id ${id} not found`);
        }
        return updatedFeedback;
    }
}