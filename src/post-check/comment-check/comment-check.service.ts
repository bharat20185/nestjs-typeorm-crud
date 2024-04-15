import { Injectable } from '@nestjs/common';
import { CreateCommentCheckDto } from './dto/create-comment-check.dto';
import { UpdateCommentCheckDto } from './dto/update-comment-check.dto';

@Injectable()
export class CommentCheckService {
  create(createCommentCheckDto: CreateCommentCheckDto) {
    return 'This action adds a new commentCheck';
  }

  findAll() {
    return `This action returns all commentCheck`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentCheck`;
  }

  update(id: number, updateCommentCheckDto: UpdateCommentCheckDto) {
    return `This action updates a #${id} commentCheck`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentCheck`;
  }
}
