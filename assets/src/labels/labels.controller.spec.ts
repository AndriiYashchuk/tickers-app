import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { Label } from './label.entity';

describe('LabelsController', () => {
  let controller: LabelsController;
  let service: LabelsService;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const mockLabelsService = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
      providers: [
        {
          provide: LabelsService,
          useValue: mockLabelsService,
        },
        {
          provide: getRepositoryToken(Label),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<LabelsController>(LabelsController);
    service = module.get<LabelsService>(LabelsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
