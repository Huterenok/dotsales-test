import { Module } from '@nestjs/common';

import { CrmModule } from 'modules/crm/crm.module';

import { DealController } from './deal.controller';
import { DealService } from './deal.service';

@Module({
  imports: [CrmModule],
  controllers: [DealController],
  providers: [DealService],
})
export class DealModule {}
