import { Test, TestingModule } from '@nestjs/testing';
import { DetailFieldController } from './detail-field.controller';
import { DetailFieldService } from './detail-field.service';

describe('DetailFieldController', () => {
  let controller: DetailFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailFieldController],
      providers: [DetailFieldService],
    }).compile();

    controller = module.get<DetailFieldController>(DetailFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
