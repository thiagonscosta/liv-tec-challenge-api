import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListService } from 'src/list/list.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private listService: ListService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const list = await this.listService.findOne(createTaskDto.list_id);

    const task = this.taskRepository.create({
      title: createTaskDto.title,
      list,
    });

    const newTask = await this.taskRepository.save(task);

    if (!newTask) {
      throw new HttpException(
        'Error on create new task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return newTask;
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number): Promise<Task> {
    const task = this.taskRepository.findOne(id);
    if (!task) {
      throw new HttpException('Error on create new task', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(updateTaskDto.id);

    const updatedTask = await this.taskRepository.save({
      ...task,
      ...updateTaskDto,
    });

    if (!updatedTask) {
      throw new HttpException(
        'Error on update new task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.taskRepository.save(updatedTask);
  }

  async remove(id: number): Promise<any> {
    return this.taskRepository.delete(id);
  }

  async moveTask(id: number, list_id: number): Promise<any> {
    const task = await this.findOne(id);

    const list = await this.listService.findOne(list_id);

    task.list = list;

    await this.taskRepository.save(task);

    return true;
  }
}
