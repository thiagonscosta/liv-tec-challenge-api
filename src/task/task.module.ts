import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ListService } from 'src/list/list.service';
import { List } from 'src/list/entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([List])],
  controllers: [TaskController],
  providers: [TaskService, ListService],
})
export class TaskModule {}
