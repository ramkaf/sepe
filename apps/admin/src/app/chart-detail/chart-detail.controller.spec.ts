import { Test, TestingModule } from '@nestjs/testing';
import { ChartDetailController } from './chart-detail.controller';
import { ChartDetailService } from './chart-detail.service';

describe('ChartDetailController', () => {
  let controller: ChartDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartDetailController],
      providers: [ChartDetailService],
    }).compile();

    controller = module.get<ChartDetailController>(ChartDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
