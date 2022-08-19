import { Test, TestingModule } from '@nestjs/testing';
import { SseventService } from './ssevent.service';

describe('SseventService', () => {
  let service: SseventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SseventService],
    }).compile();

    service = module.get<SseventService>(SseventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
