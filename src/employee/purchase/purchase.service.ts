import { Body, Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Purchase } from "./schema/purchase.schema";
import { Error, Model, now } from "mongoose";
import { PurchaseDto } from "./dto/purchase.dto";
import { EmpOrder } from "src/admin/emp-orders/schema/emp-order.schema";

@Injectable()
export class PurchaseService
{
   constructor(@InjectModel(Purchase.name) private PurchaseModel:Model<Purchase>,@InjectModel(EmpOrder.name) private EmpOrderModel:Model<EmpOrder>)
   {}

   async create(data:PurchaseDto,emp_email:string):Promise<Purchase>
   {
      const newPurchase = new this.PurchaseModel({
        ...data,date_of_purchase:new Date(),
      });

      const orderDetails=new this.EmpOrderModel({
        order_id:data.order_id,
        employee_email:emp_email
      })
       await orderDetails.save()
    
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

   async findusercourse(email:string):Promise<Purchase[]>
   {
    return this.PurchaseModel.find({user_email:email}).exec()
   }
}