import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PurchaseService } from "./purchase.service";
import { PurchaseDto } from "./dto/purchase.dto";
import { Purchase } from "./schema/purchase.schema";

@Controller('/purchase')
export class PurchaseController
{
   constructor(private purchaseService:PurchaseService){}

   @Post()
   create(@Body()data:PurchaseDto):Promise<Purchase>
   {
      return this.purchaseService.create(data);
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