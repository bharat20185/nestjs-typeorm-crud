import { Test, TestingModule } from '@nestjs/testing';
import { CommentCheckService } from './comment-check.service';

describe('CommentCheckService', () => {
  let service: CommentCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentCheckService],
    }).compile();

    service = module.get<CommentCheckService>(CommentCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
