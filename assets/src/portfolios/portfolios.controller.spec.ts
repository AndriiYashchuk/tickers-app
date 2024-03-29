import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosController } from './portfolios.controller';

describe('PortfolioController', () => {
  let controller: PortfoliosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfoliosController],
    }).compile();

    controller = module.get<PortfoliosController>(PortfoliosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
