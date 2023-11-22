import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { CreateDealDto } from './dto';
import { DealService } from './deal.service';
import { CreateDealInterceptor } from './interceptor';

interface IDealController {
  createDeal(dto: CreateDealDto): Promise<void>;
}

@Controller('deal')
export class DealController implements IDealController {
  constructor(private dealService: DealService) {}

  @Post('createDeal')
  @UseInterceptors(CreateDealInterceptor)
  async createDeal(@Body() dto: CreateDealDto): Promise<void> {
    await this.dealService.createDeal(dto);
  }
}
