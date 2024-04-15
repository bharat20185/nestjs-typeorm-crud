import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoInterface } from './interface/todo.interface';
import { UserColumns } from '../common/UserColumns';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  create(createTodoDto: CreateTodoDto, loggedInUser: UserTokenPayload): Promise<TodoInterface> {
    const createUser = this.repo.create(createTodoDto);
    createUser.user = loggedInUser;
    return this.repo.save(createUser);
  }

  findAll(loggedInUser: UserTokenPayload): Promise<TodoInterface[]> {
    return this.repo.find({
      where: { user: { id: loggedInUser.id } },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        completed: true,
        user: UserColumns,
      },
    });
  }

  findOne(id: number, loggedInUser: UserTokenPayload): Promise<TodoInterface> {
    return this.repo.findOne({
      where: { id, user: { id: loggedInUser.id } },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        completed: true,
        user: UserColumns,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, loggedInUser: UserTokenPayload) {
    return await this.repo.update({ id, user: { id: loggedInUser.id } }, updateTodoDto);    
  }

  remove(id: number, loggedInUser: UserTokenPayload) {
    return this.repo.delete({ id, user: { id: loggedInUser.id } });
  }
}
