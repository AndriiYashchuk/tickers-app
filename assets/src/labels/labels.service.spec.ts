import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LabelsService } from './labels.service';
import { Label } from './label.entity';

describe('LabelsService', () => {
  let service: LabelsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: Repository<Label>;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LabelsService,
        {
          provide: getRepositoryToken(Label),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LabelsService>(LabelsService);
    repo = module.get<Repository<Label>>(getRepositoryToken(Label));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
