import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.repo.save(createUserDto);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') { // MySQL error code
        throw new ConflictException('User with this email already exists.');
      } else {
        throw err;
      }
    }
  }

  async login(email: string, password: string): Promise<AuthToken> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    const verifyPassword = await argon2.verify(user.password, password);
    if (!verifyPassword) {
      throw new UnauthorizedException();
    }

    const authToken = await this.jwt.signAsync({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    });

    return { accessToken: authToken };
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find({});
    return users;
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
