import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Purchase, PurchaseSchema } from "./schema/purchase.schema";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";





@Module({
    imports:[
        MongooseModule.forFeature([{name:Purchase.name,schema:PurchaseSchema}]),
    ],
    providers:[PurchaseService],
    controllers:[PurchaseController]
})
export class PurchaseModule{}