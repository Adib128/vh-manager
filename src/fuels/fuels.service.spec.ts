import { Test, TestingModule } from '@nestjs/testing';
import { FuelsService } from './fuels.service';

describe('FuelsService', () => {
  let service: FuelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelsService],
    }).compile();

    service = module.get<FuelsService>(FuelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
