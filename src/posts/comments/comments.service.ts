import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostInterface } from '../interface/post.interface';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async create(createCommentDto: CreateCommentDto, post: PostInterface) {
    const createdComment = this.repo.create({
      ...createCommentDto,
      post: { id: post.id },
    });
    return await this.repo.save(createdComment);
  }

  findAll(postId: number, user: UserTokenPayload) {
    return this.repo.find({
      where: { post: { id: postId, user: { id: user.id } } },
      relations: ['post'],
      select: {
        id: true,
        name: true,
        email: true,
        body: true,
        post: {
          id: true,
        },
      },
    });
  }

  async findOne(id: number, postId: number, user: UserTokenPayload) {
    const comment = await this.repo.findOne({
      where: { id, post: { id: postId, user: { id: user.id } } },
      relations: ['post'],
      select: {
        id: true,
        name: true,
        email: true,
        body: true,
        post: {
          id: true,
        },
      },
    });
    return comment;
  }
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.repo.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
