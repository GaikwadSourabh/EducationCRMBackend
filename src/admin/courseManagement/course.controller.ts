import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CourseService } from "./course.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { Observable } from "rxjs";
import { Course } from "./schema/course.schema";

@Controller('/admin/course')
export class CourseController
{
    constructor(private readonly courseService:CourseService){}


    @Post()
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination:'./uploads',
            filename:(req,file,cb)=>{
                const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}${extname(file.originalname)}`;
                cb(null,filename)
            }
        })
    }))

    async create(@UploadedFile() image:Express.Multer.File,@Body() body:any)
    {
        const course = {
            ...body,
            image:image?.filename,
            updatedOn:new Date(),
        };
        return this.courseService.create(course);
    }

    @Get()
    async findAll(@Query('page') page:number,@Query('limit') limit:number)
    {
        return this.courseService.findAll(Number(page)|| 1, Number(limit) || 5);
    }

    @Get('/all')
    async finadAllCourse()
    {
        return this.courseService.findAllCourses()
    }

    @Get(':id')
    findOne(@Param('id')id:string)
    {
        return this.courseService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() data:any)
    {
        return this.courseService.update(id,data);
    }

    @Delete(':id')
     delete(@Param('id') id:string)
    {
         return this.courseService.delete(id);
    }

   


}