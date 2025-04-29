import { Test, TestingModule } from '@nestjs/testing';
import { EntityTypeController } from './entity-type.controller';
import { EntityTypeService } from './entity-type.service';

describe('EntityTypeController', () => {
  let controller: EntityTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityTypeController],
      providers: [EntityTypeService],
    }).compile();

    controller = module.get<EntityTypeController>(EntityTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
