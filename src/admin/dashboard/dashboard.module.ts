import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Purchase, PurchaseSchema } from "src/employee/purchase/schema/purchase.schema";
import { DashbordService } from "./dashboard.service";
import { DashbordController } from "./dashboard.controller";


@Module({
    imports:[MongooseModule.forFeature([{name:Purchase.name,schema:PurchaseSchema}])],
    controllers:[DashbordController],
    providers:[DashbordService]
})export class DashboardModule{}