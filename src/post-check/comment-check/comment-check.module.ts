import { Module } from '@nestjs/common';
import { CommentCheckService } from './comment-check.service';
import { CommentCheckController } from './comment-check.controller';
import { PostCheckService } from '../post-check.service';

@Module({
  controllers: [CommentCheckController],
  providers: [CommentCheckService, PostCheckService],
})
export class CommentCheckModule {}
