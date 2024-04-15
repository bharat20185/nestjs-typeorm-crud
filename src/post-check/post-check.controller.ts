import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostCheckService } from './post-check.service';
import { CreatePostCheckDto } from './dto/create-post-check.dto';
import { UpdatePostCheckDto } from './dto/update-post-check.dto';

@Controller('post-check')
export class PostCheckController {
  constructor(private readonly postCheckService: PostCheckService) {}

  @Post()
  create(@Body() createPostCheckDto: CreatePostCheckDto) {
    return this.postCheckService.create(createPostCheckDto);
  }

  @Get()
  findAll() {
    return this.postCheckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postCheckService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostCheckDto: UpdatePostCheckDto) {
    return this.postCheckService.update(+id, updatePostCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postCheckService.remove(+id);
  }
}
