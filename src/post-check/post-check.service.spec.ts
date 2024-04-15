import { Test, TestingModule } from '@nestjs/testing';
import { PostCheckService } from './post-check.service';

describe('PostCheckService', () => {
  let service: PostCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostCheckService],
    }).compile();

    service = module.get<PostCheckService>(PostCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
