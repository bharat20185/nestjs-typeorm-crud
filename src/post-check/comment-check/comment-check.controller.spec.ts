import { Test, TestingModule } from '@nestjs/testing';
import { CommentCheckController } from './comment-check.controller';
import { CommentCheckService } from './comment-check.service';

describe('CommentCheckController', () => {
  let controller: CommentCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentCheckController],
      providers: [CommentCheckService],
    }).compile();

    controller = module.get<CommentCheckController>(CommentCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
