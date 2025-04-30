import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { FollowUpsService } from "./follow-ups.service";

@Controller('/followUps')
export class FollowUpsController
{
    constructor(private followUpsService:FollowUpsService){}

    @Get()
    async getMyFollowUps(
      @Query('empEmail') empEmail: string,
      @Query('followUpDate') followUpDate: string,) 
      {
      return this.followUpsService.getMyFollowUps(empEmail, followUpDate);
    }
}