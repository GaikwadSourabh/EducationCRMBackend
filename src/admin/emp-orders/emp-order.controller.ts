import { Controller, Get } from "@nestjs/common";
import { empOrderService } from "./emp-order.service";



@Controller('sales-info')
export class EmpOrderController
{
    constructor(private empOrderService:empOrderService){}

   @Get('total')
   getTotalSales()
   {
     return this.empOrderService.findTotalSaleByAllEmployee();
   }

   @Get('by-employee')
   getsalesByEmployee()
   {
     return this.empOrderService.findTotalSalesByEachEmployee();
   }
}