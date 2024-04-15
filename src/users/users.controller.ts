import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterceptor } from './interceptors/user.interceptors';
import { User } from './entities/user.entity';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserTokenPayload } from './interface/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  create(@Body() createUserDto) {}

  @Get()
  @Serialize(UserDto)
  @UseInterceptors(UserInterceptor)  
  async findAll(@CurrentUser() user: UserTokenPayload): Promise<User[]> {
    console.log(user);
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @UseInterceptors(UserInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(UserInterceptor)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(id, updateUserDto);
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
