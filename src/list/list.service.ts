import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const list = await this.listRepository.create(createListDto);

    const newList = await this.listRepository.save(list);

    if (!newList) {
      throw new HttpException(
        'Error on create new list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newList;
  }

  async findAll(): Promise<List[]> {
    return await this.listRepository.find({
      relations: ['tasks'],
    });
  }

  async findOne(id: number): Promise<List> {
    const list = await this.listRepository.findOne(id);
    if (!list) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return list;
  }

  async update(updateListDto: UpdateListDto): Promise<List> {
    const id = updateListDto.id;
    await this.listRepository.update(id, updateListDto);
    const updatedList = await this.listRepository.findOne(id);
    if (!updatedList) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return updatedList;
  }

  async remove(id: number): Promise<any> {
    await this.listRepository.delete(id);
    return true;
  }
}
