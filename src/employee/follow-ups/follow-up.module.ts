import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowUpsService } from './follow-ups.service';
import { FollowUps, FollowUpsSchema } from './schema/follow-ups.schema';
import { FollowUpsController } from './follow-ups.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FollowUps.name, schema: FollowUpsSchema }])
  ],
  providers: [FollowUpsService],
  exports: [FollowUpsService], 
  controllers:[FollowUpsController]
})
export class FollowUpsModule {}
