import { JwtUser } from '@tickers-app/common/types/domain/JwtUser';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

import { CreateStockDto } from './dtos/create-stock.dto';
import { Stock } from './stock.entity';
import { StockDto } from './dtos/stock.dto';
import { UpdateStockDto } from './dtos/update-stock.dto';

const userOwner: JwtUser = {
  id: 'userId',
  email: 'test123@gmail.com',
  iat: 1244,
};
const userNotOwner: JwtUser = {
  id: 'userId1',
  email: 'test@gmail.com',
  iat: 245,
};

const stock1: CreateStockDto = {
  ticker: 'APPL',
  purchaseDate: new Date(2023, 2, 1).getTime(),
  price: 20,
};

const stock2: CreateStockDto = {
  ticker: 'QQQ',
  purchaseDate: new Date(2023, 2, 1).getTime(),
  price: 20,
};

describe('StocksController', () => {
  let controller: StocksController;
  let negativeController: StocksController;
  let mockStocksPositiveService: Partial<StocksService>;
  let mockStocksNegativeService: Partial<StocksService>;

  beforeEach(async () => {
    mockStocksPositiveService = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn().mockImplementation((id, userId) => ({
        id: userOwner.id,
        ...stock1,
        userId,
      })),
      find: jest.fn().mockImplementation(
        (userId, ticker): Stock[] =>
          (ticker
            ? [
                { ...stock1, id: '1', userId, ticker },
                { ...stock2, id: '2', userId, ticker },
              ]
            : [
                { ...stock1, id: '1', userId },
                { ...stock2, id: '2', userId },
              ]) as Stock[],
      ),
      remove: jest.fn(),
    };

    mockStocksNegativeService = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn().mockImplementation(() => {
        throw new NotFoundException();
      }),
      update: jest
        .fn()
        .mockImplementation(
          (
            id: string,
            attrs: Partial<Stock>,
            userId: string,
          ): Promise<Stock | null> => {
            if (attrs.id === id && userId === userOwner.id) {
              return Promise.resolve({ id, ...attrs, userId } as Stock);
            }
            throw new NotFoundException();
          },
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [
        {
          provide: StocksService,
          useValue: mockStocksPositiveService,
        },
      ],
    }).compile();

    const negativeModule: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [
        {
          provide: StocksService,
          useValue: mockStocksNegativeService,
        },
      ],
    }).compile();

    controller = module.get<StocksController>(StocksController);
    negativeController = negativeModule.get<StocksController>(StocksController);
  });

  describe('Try to check success cases', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should create stock1', () => {
      controller.createStock(userOwner, stock1);
      expect(mockStocksPositiveService.create).toHaveBeenCalledWith(
        stock1,
        userOwner.id,
      );
    });

    it('should findStock stock1', () => {
      const stockId = '124';
      controller.findStock(userOwner, stockId);
      expect(mockStocksPositiveService.findOne).toHaveBeenCalledWith(
        stockId,
        userOwner.id,
      );
    });

    const tickerToFind = 'ABC';
    it(`should find all user stocks with ticker "${tickerToFind}"`, async () => {
      const result: StockDto[] = await controller.findAllStocks(
        userOwner,
        tickerToFind,
      );
      expect(mockStocksPositiveService.find).toHaveBeenCalledWith(
        userOwner.id,
        tickerToFind,
      );
      const allTickersOwnedByUser = result.every(
        ({ ticker }) => ticker === tickerToFind,
      );

      expect(allTickersOwnedByUser).toBe(true);
    });

    it("should find all user's stocks", async () => {
      const result = await controller.findAllStocks(userOwner);

      expect(mockStocksPositiveService.find).toHaveBeenCalledWith(
        userOwner.id,
        undefined,
      );

      const allTickersOwnedByUser = result.every(
        ({ userId }) => userId === userOwner.id,
      );

      expect(allTickersOwnedByUser).toBe(true);
    });
  });

  describe('Try to check negative cases', () => {
    it('should throw error when not owner user try to call findStock', async () => {
      const stockId = '124';

      await expect(
        negativeController.findStock(userNotOwner, stockId),
      ).rejects.toThrow(NotFoundException);
      expect(mockStocksNegativeService.findOne).toHaveBeenCalledWith(
        stockId,
        userNotOwner.id,
      );
    });

    it('should throw error when not owner user try to call removeStock', async () => {
      const stockId = '124';

      await expect(
        negativeController.removeStock(userNotOwner, stockId),
      ).rejects.toThrow(NotFoundException);

      expect(mockStocksNegativeService.remove).toHaveBeenCalledWith(
        stockId,
        userNotOwner.id,
      );
    });

    it('should throw error when not owner user try to call updateStock', async () => {
      const stockId = '124';
      const updateStockDto: UpdateStockDto = {
        id: '1',
        price: 100,
      };

      await expect(
        negativeController.updateStock(userNotOwner, stockId, updateStockDto),
      ).rejects.toThrow(NotFoundException);

      expect(mockStocksNegativeService.update).toHaveBeenCalledWith(
        stockId,
        updateStockDto,
        userNotOwner.id,
      );
    });
  });
});
