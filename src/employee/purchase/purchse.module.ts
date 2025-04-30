import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Purchase, PurchaseSchema } from "./schema/purchase.schema";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";
import { EmpOrderModule } from "src/admin/emp-orders/emp-order.module";
import { EmpOrder, EmpSchema } from "src/admin/emp-orders/schema/emp-order.schema";





@Module({
    imports:[
        MongooseModule.forFeature([{name:Purchase.name,schema:PurchaseSchema}]),
        MongooseModule.forFeature([{name:EmpOrder.name,schema:EmpSchema}]),
        EmpOrderModule
    ],
    providers:[PurchaseService],
    controllers:[PurchaseController],
    exports:[PurchaseModule]
})
export class PurchaseModule{}