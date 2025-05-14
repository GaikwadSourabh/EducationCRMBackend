import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './admin/courseManagement/course.module';
import { EmployeeModule } from './admin/employeeManagement/employee.module';
import { PurchaseModule } from './employee/purchase/purchse.module';
import { InquryModule } from './employee/inquary/inqury.module';
import { EmployeeAuthModule } from './employee/employeeAuth/employee-auth.module';
import { UsersModule } from './admin/users/users.module';
import { FeedbackModule } from './admin/feedback/feedback.module';
import { EmpOrderModule } from './admin/emp-orders/emp-order.module';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { UsersAuthModule } from './employee/usersAuth/user-auth.module';

@Module({
  imports: [EmployeeAuthModule, MongooseModule.forRoot('mongodb://localhost:27017/education-crm'),CourseModule,EmployeeModule,
    PurchaseModule,InquryModule,UsersModule,FeedbackModule,EmpOrderModule,DashboardModule,UsersAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
