import { Module } from '@nestjs/common';
import { PostCheckService } from './post-check.service';
import { PostCheckController } from './post-check.controller';
import { CommentCheckModule } from './comment-check/comment-check.module';

@Module({
  controllers: [PostCheckController],
  providers: [PostCheckService],
  imports: [CommentCheckModule],
})
export class PostCheckModule {}
