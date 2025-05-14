import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EmpOrder, EmpSchema } from "./schema/emp-order.schema";
import { Model } from "mongoose";
import { Purchase } from "src/employee/purchase/schema/purchase.schema";
import { Employee } from "../employeeManagement/schema/employee.schema";

@Injectable()
export class empOrderService
{
  constructor(
    @InjectModel(EmpOrder.name) private empOrderModel:Model<EmpOrder>,
    @InjectModel(Purchase.name) private purchaseModel:Model<Purchase>,
    @InjectModel(Employee.name) private employeeModel:Model<Employee>
    ){}
   

    async findTotalSaleByAllEmployee(): Promise<number> {
        const result = await this.purchaseModel.aggregate([
          {
            $match: {
              order_id: { $regex: '^ORD-' } 
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$course_amount' }
            }
          }
        ]);
      
        return result[0]?.total || 0;
      }
      

      async findTotalSalesByEachEmployee(): Promise<any[]> {
        const result = await this.empOrderModel.aggregate([
          {
            $lookup: {
              from: 'employees',
              localField: 'employee_email',
              foreignField: 'email',
              as: 'employeeInfo'
            }
          },
          { $unwind: { path: '$employeeInfo', preserveNullAndEmptyArrays: false } },
      
          // Ensure employee has valid name, email, and phone
          {
            $match: {
              'employeeInfo.name': { $ne: null },
              'employeeInfo.email': { $ne: null },
              'employeeInfo.phoneno': { $ne: null }
            }
          },
      
          {
            $lookup: {
              from: 'purchases',
              localField: 'order_id',
              foreignField: 'order_id',
              as: 'orderInfo'
            }
          },
          { $unwind: { path: '$orderInfo', preserveNullAndEmptyArrays: true } },
      
          //  Only include purchases where order_id starts with "ORD-"
          {
            $match: {
              'orderInfo.order_id': { $regex: '^ORD-' }
            }
          },
      
          {
            $group: {
              _id: {
                name: '$employeeInfo.name',
                email: '$employeeInfo.email',
                phoneno: '$employeeInfo.phoneno'
              },
              total_sale: { $sum: '$orderInfo.course_amount' }
            }
          },
          {
            $project: {
              _id: 0,
              name: '$_id.name',
              email: '$_id.email',
              phoneno: '$_id.phoneno',
              total_sale: 1
            }
          }
        ]);
      
        return result;
      }
      
}