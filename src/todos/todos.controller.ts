import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { TodoInterface } from './interface/todo.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<TodoInterface> {
    return this.todosService.create(createTodoDto, loggedInUser);
  }

  @Get()
  async findAll(
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<TodoInterface[]> {
    const todos = await this.todosService.findAll(loggedInUser);
    if (!todos) return [];
    return todos;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<TodoInterface> {
    const todo = await this.todosService.findOne(id, loggedInUser);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<TodoInterface> {
    const updatedTodo = await this.todosService.update(
      id,
      updateTodoDto,
      loggedInUser,
    );
    if (updatedTodo.affected === 0)
      throw new NotFoundException('Todo not found');
    const todo = await this.todosService.findOne(id, loggedInUser);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<void> {
    await this.todosService.remove(id, loggedInUser);
    return;
  }
}
