import { Test, TestingModule } from '@nestjs/testing';
import { OperacionService } from './operacion.service';

describe('OperacionService', () => {
  let service: OperacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionService],
    }).compile();

    service = module.get<OperacionService>(OperacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
