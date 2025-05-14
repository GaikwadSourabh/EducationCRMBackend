import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Course } from "./schema/course.schema";
import { Model } from "mongoose";

@Injectable()
export class CourseService
{
  constructor(@InjectModel(Course.name) private courseModel:Model<Course>){}

  async create(courseData:any):Promise<any>
  {
    return this.courseModel.create(courseData);
  }

  async findAll(page=1,limit=5):Promise<{data:Course[];total:number}>
  {
    const skip=(page-1)*limit;
    const [data, total]= await Promise.all([
        this.courseModel.find().skip(skip).limit(limit).exec(),
        this.courseModel.countDocuments()
    ]);

    return {data,total}
  }

  async findAllCourses():Promise<Course[]>
  {
    return this.courseModel.find().exec();
  }

  async findOne(id:string):Promise<Course>
  {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id:string,data:any):Promise<Course>
  {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedCourse) {
      throw new Error(`Course with id ${id} not found`);
    }
    return updatedCourse;
  }

  async delete(id:string):Promise<Course>
  {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new Error(`Course with id ${id} not found`);
    }
    return deletedCourse;
  }

  async findByname(name:string):Promise<Course>
  {
    const course= await this.courseModel.findOne({name: new RegExp(`^${name}$`, 'i')}).exec();
    if (!course) {
      throw new Error(`Course with name ${name} not found`);
    }
    return course;
  }
 
}