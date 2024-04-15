import { Test, TestingModule } from '@nestjs/testing';
import { PostCheckController } from './post-check.controller';
import { PostCheckService } from './post-check.service';

describe('PostCheckController', () => {
  let controller: PostCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCheckController],
      providers: [PostCheckService],
    }).compile();

    controller = module.get<PostCheckController>(PostCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
