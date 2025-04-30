import { Controller, Get } from "@nestjs/common";
import { DashbordService } from "./dashboard.service";



@Controller('dashbord')
export class DashbordController
{
    constructor(private dashbordService:DashbordService){}

    @Get('total-sales-amount')
    getCourseAmountTotalSales()
    {
        return this.dashbordService.findCourseAmountTotalSales();
    }

    @Get('total-course-sold')
    getCoursesTotalSales()
    {
        return this.dashbordService.findCoursesTotalSales();
    }

    @Get('sold-per-day')
    getCourseSoldPerDay()
    {
        return this.dashbordService.findCourseSoldPerDay();
    }
}