import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from '../posts.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { CommentInterface } from './interface/comment.interface';

@Controller('/posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: UserTokenPayload,
  ) {
    const post = await this.postsService.findOne(postId, user);
    if (!post) throw new NotFoundException('Post not found');
    return await this.commentsService.create(createCommentDto, post);
  }

  @Get()
  findAll(
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: UserTokenPayload,
  ): Promise<CommentInterface[]> {
    return this.commentsService.findAll(postId, user);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: UserTokenPayload,
  ): Promise<CommentInterface> {
    const comment = await this.commentsService.findOne(id, postId, user);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  @Patch(':id')
  async update(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: UserTokenPayload,
  ): Promise<CommentInterface> {
    const post = await this.postsService.findOne(postId, user);
    if (!post) throw new NotFoundException('Comment not found');
    const updatedComment = await this.commentsService.update(id, updateCommentDto);
    if(updatedComment.affected === 0) throw new NotFoundException('Comment not found');
    const comment = await this.commentsService.findOne(id, postId, user);
    return comment;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: UserTokenPayload,
  ) {
    const post = await this.postsService.findOne(postId, user);
    if (!post) throw new NotFoundException('Comment not found');
    return this.commentsService.remove(id);
  }
}
