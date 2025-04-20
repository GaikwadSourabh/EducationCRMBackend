import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Purchase } from "./schema/purchase.schema";
import { Error, Model, now } from "mongoose";
import { PurchaseDto } from "./dto/purchase.dto";

@Injectable()
export class PurchaseService
{
   constructor(@InjectModel(Purchase.name) private PurchaseModel:Model<Purchase>)
   {}

   async create(@Body() data:PurchaseDto):Promise<Purchase>
   {
      const newPurchase = new this.PurchaseModel({
        ...data,date_of_purchase:new Date(),
      });

      return newPurchase.save()
   }

   async findAll():Promise<Purchase[]>
   {
    return this.PurchaseModel.find().exec();
   }

   async findOne(id:string):Promise<Purchase>
   {
     const purchase = await this.PurchaseModel.findById(id).exec();
     if(!purchase)
     {
        throw new Error(`id ${id} not found`)
     }
     return purchase;
   }

   async update(id: string, data: PurchaseDto): Promise<Purchase> {
    const purchase = await this.PurchaseModel.findByIdAndUpdate(
      id,
      { ...data, date_of_purchase: new Date() }, 
      { new: true } 
    );
  
    if (!purchase) {
      throw new Error(`Course with id ${id} not updated`);
    }
  
    return purchase;
  }

   async delete(id:string):Promise<Purchase>
   {
    const deletedPurchase= await this.PurchaseModel.findByIdAndDelete(id).exec();
    if(!deletedPurchase)
    {
        throw new Error(`Course with id ${id} not deleted`)
    }
    return  deletedPurchase;
   }
}