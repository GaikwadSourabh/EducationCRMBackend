import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Purchase } from "src/employee/purchase/schema/purchase.schema";


@Injectable()
export class DashbordService
{
    constructor(@InjectModel(Purchase.name) private PurchaseModel:Model<Purchase>){}

    async findCourseAmountTotalSales()
    {
        return this.PurchaseModel.aggregate([
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$date_of_purchase" }
                },
                total_sales_amount: { $sum: "$course_amount" }
              }
            },
            { $sort: { _id: 1 } }
          ]);
          
    }

    async findCoursesTotalSales()
    {
        return this.PurchaseModel.aggregate([
            {
                $group:{
                    _id:'$course_name',
                    total_sale:{$sum:1}
                }
            }
        ]);
    }

    async findCourseSoldPerDay()
    {
        return this.PurchaseModel.aggregate([
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$date_of_purchase" }
                },
                number_of_courses_sold: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ]);
          
    }
}