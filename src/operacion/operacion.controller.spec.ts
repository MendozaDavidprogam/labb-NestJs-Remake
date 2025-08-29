import { Test, TestingModule } from '@nestjs/testing';
import { OperacionController } from './operacion.controller';

describe('OperacionController', () => {
  let controller: OperacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperacionController],
    }).compile();

    controller = module.get<OperacionController>(OperacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
