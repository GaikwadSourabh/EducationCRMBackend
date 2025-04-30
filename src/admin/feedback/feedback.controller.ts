import { Body, Controller, Get, Param, ParseBoolPipe, Patch, Post, Query } from "@nestjs/common";
import { FeedbackDto } from "./dto/feedback.dto";
import { Feedback } from "./schema/feedback.schema";
import { now } from "mongoose";
import { FeedbackService } from "./feedback.service";

@Controller('/feedback')
export class FeedbackController
{
    constructor(private feedbackService:FeedbackService){}

    @Post()
    async create(@Body()data:FeedbackDto):Promise<Feedback>
    {
        const feedback = { ...data, date_of_feedback: new Date() }

        return this.feedbackService.create(feedback);
    }

    @Get()
    async findAll(@Param('page')page:number,@Param('limit')limit:number):Promise<{data:Feedback[],total:number}>
    {
      return this.feedbackService.findAll(Number(page)||1,Number(limit)||5)
    }

    @Patch(':id')
    async updateStatus(@Param('id')id:string,@Body('read_status',ParseBoolPipe)read_status:boolean):Promise<Feedback>
    {
        return this.feedbackService.updateBanStatus(id,read_status)
    }


}