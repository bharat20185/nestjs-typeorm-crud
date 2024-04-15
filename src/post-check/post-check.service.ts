import { Injectable } from '@nestjs/common';
import { CreatePostCheckDto } from './dto/create-post-check.dto';
import { UpdatePostCheckDto } from './dto/update-post-check.dto';

@Injectable()
export class PostCheckService {
  create(createPostCheckDto: CreatePostCheckDto) {
    return 'This action adds a new postCheck';
  }

  findAll() {
    return `This action returns all postCheck`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postCheck`;
  }

  update(id: number, updatePostCheckDto: UpdatePostCheckDto) {
    return `This action updates a #${id} postCheck`;
  }

  remove(id: number) {
    return `This action removes a #${id} postCheck`;
  }
}
