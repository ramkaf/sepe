import { Test, TestingModule } from '@nestjs/testing';
import { ChartDetailService } from './chart-detail.service';

describe('ChartDetailService', () => {
  let service: ChartDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChartDetailService],
    }).compile();

    service = module.get<ChartDetailService>(ChartDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
