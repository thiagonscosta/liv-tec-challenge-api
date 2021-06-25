import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { List } from 'src/list/entities/list.entity';
// import { Task } from 'src/task/entities/task.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
