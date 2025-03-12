import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dtos/create-stock.dto';
import { Stock } from './stock.entity';
import { isUserEntityOwner } from '../utils/is-user-entity-owner';

const stockAAPLDto: CreateStockDto = {
  ticker: 'AAPL',
  purchaseDate: new Date().getTime(),
  price: 10,
};

const stockTSLADto: CreateStockDto = {
  ticker: 'TSLA',
  purchaseDate: new Date().getTime(),
  price: 5,
};

const userId = 'userId';

describe('StocksService', () => {
  let service: StocksService;

  const fakeStocksRepo = {
    // Mock implementation of find method
    find: jest.fn().mockResolvedValue([
      { userId, ...stockAAPLDto },
      { userId, ...stockTSLADto },
    ]),
    // Add mock implementations for other methods as needed
    findOneBy: jest
      .fn()
      .mockImplementation(({ id }) =>
        Promise.resolve({ id, userId, ...stockAAPLDto }),
      ),
    create: jest.fn().mockImplementation(stock => stock),
    save: jest
      .fn()
      .mockImplementation(stock => Promise.resolve({ ...stock, id: '1' })),
    remove: jest.fn().mockImplementation(stock => stock),
  };

  const fakeLabelsRepo = {
    find: jest.fn().mockResolvedValue([]),
    findOneBy: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        {
          provide: 'StockRepository',
          useValue: fakeStocksRepo,
        },
        {
          provide: 'LabelRepository',
          useValue: fakeLabelsRepo,
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a stock', async () => {
    const result = await service.create(stockAAPLDto, userId);
    expect(result).toEqual({ ...stockAAPLDto, userId, id: '1' });
    expect(fakeStocksRepo.create).toHaveBeenCalled();
    expect(fakeStocksRepo.save).toHaveBeenCalled();
  });

  it('should find one stock by id', async () => {
    const stockId = '1';
    const stock = await service.findOne(stockId, userId);
    const expected = {
      ...stockAAPLDto,
      userId,
      id: stockId,
    };
    expect(stock).toEqual(expected);
    expect(fakeStocksRepo.findOneBy).toHaveBeenCalledWith({
      userId,
      id: stockId,
    });
  });

  it('should find stocks by userId and optional ticker', async () => {
    const ticker = 'TSLA';
    const stocks = await service.find(userId, ticker);
    expect(stocks).toEqual([
      { userId, ...stockAAPLDto },
      { userId, ...stockTSLADto },
    ]);
    expect(fakeStocksRepo.find).toHaveBeenCalledWith({
      where: { userId, ticker },
    });
  });

  it('should update a stock', async () => {
    const stockId = '1';
    const attrs = { price: 20, notice: 'hello world' };
    const expectedValue = { ...stockAAPLDto, ...attrs };

    const updatedStock = await service.update(stockId, attrs, userId);
    expect(updatedStock).toEqual({
      ...expectedValue,
      id: '1',
      userId,
    });
    expect(fakeStocksRepo.save).toHaveBeenCalledWith({
      ...expectedValue,
      id: '1',
      userId,
    });
  });

  it('should remove a stock', async () => {
    const stockId = '1';
    const ownerId = 'userId';

    const expectedValue = {
      ...stockAAPLDto,
      id: '1',
      userId,
    };

    const removedStock = await service.remove(stockId, ownerId);
    expect(removedStock).toEqual(expectedValue);
    expect(fakeStocksRepo.remove).toHaveBeenCalledWith(expectedValue);
  });

  it('should throw error if not stock owner try to update stock', async () => {
    const stockId = 'non-existent';
    fakeStocksRepo.findOneBy.mockResolvedValueOnce({
      userId: 'abc',
      ticker: 'AAPL',
    });

    await expect(
      service.update(stockId, { price: 20 }, userId),
    ).rejects.toThrow(NotFoundException);
  });

  it("should throw error if there isn't stock with id", async () => {
    const stockId = 'non-existent';
    fakeStocksRepo.findOneBy.mockResolvedValueOnce(null);

    await expect(
      service.update(stockId, { price: 20 }, userId),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw error if stock to remove not found', async () => {
    const stockId = 'non-existent';
    const ownerId = 'abc';
    fakeStocksRepo.findOneBy.mockResolvedValueOnce(null);

    await expect(service.remove(stockId, ownerId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('check is user stock owner', async () => {
    const currentUserId = userId;
    const stock1 = {
      ...stockAAPLDto,
      id: '1',
      userId,
    };
    const stock2 = {
      ...stockAAPLDto,
      id: '2',
      userId: 'abc',
    };

    expect(isUserEntityOwner(stock1 as Stock, currentUserId)).toBe(true);
    expect(isUserEntityOwner(stock2 as Stock, currentUserId)).toBe(false);
  });

  it('should find all stocks', async () => {
    const all = await service.findAll(userId);
    all.forEach(({ userId: ownerId }) => {
      expect(ownerId).toEqual(userId);
    });
  });
});
