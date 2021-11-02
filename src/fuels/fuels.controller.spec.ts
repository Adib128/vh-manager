import { Test, TestingModule } from '@nestjs/testing';
import { FuelsController } from './fuels.controller';
import { FuelsService } from './fuels.service';

describe('FuelsController', () => {
  let controller: FuelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelsController],
      providers: [FuelsService],
    }).compile();

    controller = module.get<FuelsController>(FuelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
