import { Test, TestingModule } from '@nestjs/testing';
import { ChartEntityService } from './chart-entity.service';

describe('ChartEntityService', () => {
  let service: ChartEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChartEntityService],
    }).compile();

    service = module.get<ChartEntityService>(ChartEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
