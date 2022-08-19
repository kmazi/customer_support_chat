import { Test, TestingModule } from '@nestjs/testing';
import { SseventController } from './ssevent.controller';
import { SseventService } from './ssevent.service';

describe('SseventController', () => {
  let controller: SseventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SseventController],
      providers: [SseventService],
    }).compile();

    controller = module.get<SseventController>(SseventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
