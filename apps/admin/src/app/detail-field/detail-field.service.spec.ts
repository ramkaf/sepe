import { Test, TestingModule } from '@nestjs/testing';
import { DetailFieldService } from './detail-field.service';

describe('DetailFieldService', () => {
  let service: DetailFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailFieldService],
    }).compile();

    service = module.get<DetailFieldService>(DetailFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
