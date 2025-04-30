import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmpOrder, EmpSchema } from "./schema/emp-order.schema";
import { EmpOrderController } from "./emp-order.controller";
import { empOrderService } from "./emp-order.service";
import { Purchase, PurchaseSchema } from "src/employee/purchase/schema/purchase.schema";
import { Employee, EmployeeSchema } from "../employeeManagement/schema/employee.schema";


@Module({
    imports:[MongooseModule.forFeature([{name:EmpOrder.name,schema:EmpSchema},
                                        {name:Purchase.name,schema:PurchaseSchema},
                                        {name:Employee.name,schema:EmployeeSchema}
                                    ])],
    controllers:[EmpOrderController],
    providers:[empOrderService],
    exports: [EmpOrderModule], 
})
export class EmpOrderModule{}