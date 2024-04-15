import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { log } from 'console';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { PostInterface } from './interface/post.interface';
import { UpdatePhotoDto } from 'src/albums/photos/dto/update-photo.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<PostInterface> {
    return this.postsService.create(createPostDto, loggedInUser);
  }

  @Get()
  async findAll(
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<PostInterface[]> {
    return await this.postsService.findAll(loggedInUser);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<PostInterface> {
    const post = await this.postsService.findOne(id, loggedInUser);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<PostInterface> {
    const updatedPost = await this.postsService.update(
      id,
      updatePostDto,
      loggedInUser,
    );
    if (updatedPost.affected === 0)
      throw new NotFoundException('Post not found');
    const post = await this.postsService.findOne(id, loggedInUser);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() loggedInUser: UserTokenPayload) {
    return this.postsService.remove(id, loggedInUser);
  }
}
