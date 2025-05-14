import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PurchaseService } from "./purchase.service";
import { PurchaseDto } from "./dto/purchase.dto";
import { Purchase } from "./schema/purchase.schema";
import { EmployeeJwtGuard } from "../employeeAuth/employee-jwt.guard";

@Controller('/purchase')
// @UseGuards(EmployeeJwtGuard)
export class PurchaseController
{
   constructor(private purchaseService:PurchaseService){}

   @Post()
   create(@Body()data:PurchaseDto,@Query('emp_email') emp_email:string):Promise<Purchase>
   {
      return this.purchaseService.create(data,emp_email);
   }

   @UseGuards(EmployeeJwtGuard)
   @Get('details')
   findPurchaseDetails(@Query('email') email:string)
   {
      return this.purchaseService.findusercourse(email);
   }

   @Get()
   findAll():Promise<Purchase[]>
   {
      return this.purchaseService.findAll();
   }

   @Get(':id')
   findOne(@Param('id')id:string):Promise<Purchase>
   {
    return this.purchaseService.findOne(id);
   }

   @Put(':id')
   update(@Param('id')id:string,@Body()data:PurchaseDto):Promise<Purchase>
   {
     return this.purchaseService.update(id,data);
   }

   @Delete(':id')
   Delete(@Param('id')id:string):Promise<Purchase>
   {
     return this.purchaseService.delete(id);
   }

}