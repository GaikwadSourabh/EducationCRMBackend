import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './admin/courseManagement/schema/course.schema';
import { CourseModule } from './admin/courseManagement/course.module';
import { EmployeeModule } from './admin/employeeManagement/employee.module';
import { PurchaseModule } from './users/purchase/purchse.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/education-crm'),CourseModule,EmployeeModule,PurchaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
