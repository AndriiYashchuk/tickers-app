import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from '@tickers-app/common/types/domain/JwtUser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckUserInterceptor } from './interceptors/check-user-interceptor.service';
import { MockCurrentUserFromJwtInterceptor } from './interceptors/__mocks__/current-user-from-jwt.interceptor';
import { IsCurrentUserAdminInterceptor } from './interceptors/is-current-user-admin.interceptor';
import { MockIsCurrentUserAdminInterceptor } from './interceptors/__mocks__/is-current-user-admin.interceptor';

describe('AppController', () => {
  let appController: AppController;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockJwtService = {
      verifyAsync: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: CheckUserInterceptor,
          useClass: MockCurrentUserFromJwtInterceptor,
        },
        {
          provide: IsCurrentUserAdminInterceptor,
          useClass: MockIsCurrentUserAdminInterceptor,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return healthCheck', () => {
    const result = appController.healthCheck();
    expect(result.status).toBe('ok');
  });

  it('should return currentUser', () => {
    const currentUser: JwtUser = {
      id: 'test',
      email: 'test@gmail.com',
      iat: 123445,
      isAdmin: false,
    };
    const result = appController.whoAmI(currentUser);
    expect(result.id).toBe(currentUser.id);
    expect(result.email).toBe(currentUser.email);
    expect(result.iat).toBe(currentUser.iat);
    expect(result.isAdmin).toBe(currentUser.isAdmin);
  });
});
