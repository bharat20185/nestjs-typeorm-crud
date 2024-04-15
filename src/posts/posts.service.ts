import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { PostInterface } from './interface/post.interface';
import { UserColumns } from 'src/common/UserColumns';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(createPostDto: CreatePostDto, loggedInUser: UserTokenPayload): Promise<PostInterface> {
    const createdPost = this.repo.create(createPostDto);
    createdPost.user = loggedInUser;
    return this.repo.save(createdPost);
  }

  findAll(loggedInUser: UserTokenPayload): Promise<PostInterface[]> {
    return this.repo.find({
      where: { user: { id: loggedInUser.id } },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        body: true,
        user: UserColumns,
      },
    });
  }

  findOne(id: number, loggedInUser: UserTokenPayload): Promise<PostInterface> {
    return this.repo.findOne({
      where: { id, user: { id: loggedInUser.id } },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        body: true,
        user: UserColumns,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto, loggedInUser: UserTokenPayload) {
    return await this.repo.update({ id, user: { id: loggedInUser.id } }, updatePostDto);
  }

  remove(id: number, loggedInUser: UserTokenPayload) {
    return this.repo.delete({ id, user: { id: loggedInUser.id } });
  }
}
