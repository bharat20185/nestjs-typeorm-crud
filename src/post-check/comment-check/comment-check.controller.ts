import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentCheckService } from './comment-check.service';
import { CreateCommentCheckDto } from './dto/create-comment-check.dto';
import { UpdateCommentCheckDto } from './dto/update-comment-check.dto';
import { PostCheckService } from '../post-check.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('comment-check')
@Public()
export class CommentCheckController {
  constructor(
    private readonly commentCheckService: CommentCheckService,
    private readonly postCheckService: PostCheckService,
  ) {}

  @Post()
  create(@Body() createCommentCheckDto: CreateCommentCheckDto) {
    return this.commentCheckService.create(createCommentCheckDto);
  }

  @Get()
  findAll() {
    return this.postCheckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentCheckService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentCheckDto: UpdateCommentCheckDto,
  ) {
    return this.commentCheckService.update(+id, updateCommentCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentCheckService.remove(+id);
  }
}
