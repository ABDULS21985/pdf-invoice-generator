import { Test, TestingModule } from '@nestjs/testing';
import { PdfGeneratorController } from './pdf-generator.controller';
import { PdfGeneratorService } from './pdf-generator.service';

describe('PdfGeneratorController', () => {
  let controller: PdfGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfGeneratorController],
      providers: [PdfGeneratorService],
    }).compile();

    controller = module.get<PdfGeneratorController>(PdfGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
