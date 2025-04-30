import { InjectModel } from "@nestjs/mongoose";
import { FollowUps } from "./schema/follow-ups.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FollowUpsService
{
    constructor(@InjectModel(FollowUps.name) private followUpsModel:Model<FollowUps>){}

    addFollowUps(data: Partial<FollowUps>) {
        const followUp = new this.followUpsModel(data);
        return followUp.save();
      }

      async getMyFollowUps(empEmail: string, followUpDate: string): Promise<FollowUps[]> {
        return this.followUpsModel.find({
          empEmail: empEmail,
          followUpDate: followUpDate, 
        }).lean();
      }

    async deleteByPhoneNumber(phoneno:string):Promise<void>
    {
        const followUps = await this.followUpsModel.findOne({phoneno:phoneno}).exec();
        if(followUps)
        {
            await this.followUpsModel.deleteOne({_id:followUps._id}).exec();
        }
    }
}