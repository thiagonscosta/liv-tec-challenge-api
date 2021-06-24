import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, ListModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
