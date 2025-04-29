import { Test, TestingModule } from '@nestjs/testing';
import { ChartEntityController } from './chart-entity.controller';
import { ChartEntityService } from './chart-entity.service';

describe('ChartEntityController', () => {
  let controller: ChartEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartEntityController],
      providers: [ChartEntityService],
    }).compile();

    controller = module.get<ChartEntityController>(ChartEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
