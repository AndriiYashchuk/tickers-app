import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  version: '1',
  path: '/api',
})
export class AppController {
  constructor(private readonly appService: AppService) {}
}
