import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { InquaryDto } from "./dto/inquary.dto";
import { Inqury } from "./schema/inqury.schema";
import { InquryService } from "./inqury.service";
import { Query } from "@nestjs/common";
import { EmployeeJwtGuard } from "../employeeAuth/employee-jwt.guard";
import { FollowUpsService } from "../follow-ups/follow-ups.service";

@Controller('/inquiry')
// @UseGuards(EmployeeJwtGuard)
export class InquryController
{
 
    constructor(private inquiryService:InquryService, private followUpsService:FollowUpsService){}

    @Post()
    async create(@Body()data:InquaryDto,@Query('followUpDate')followUpDate?:string):Promise<Inqury>
    {
       const inquiry= {
        ...data,dateOfInquiry:new Date()
       }
       const newinquiry= await this.inquiryService.create(inquiry);

       if(data.status === 'Interested - (follow up)' && followUpDate)
       {
            await this.followUpsService.addFollowUps(
              {
                 phoneno: data.phoneno,
                 followUpDate: followUpDate, 
                 empEmail : data.empEmail
              });
        
       }
       return newinquiry;

    }

    @Get(':phoneno')
    findByPhone(@Param('phoneno') phoneno:string):Promise<Inqury[]>
    {
      return this.inquiryService.findbyPhone(phoneno);
    }

  
}