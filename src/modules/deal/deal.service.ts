import { Injectable } from '@nestjs/common';

import { CrmService } from 'modules/crm/crm.service';

import { CreateDealDto } from './dto';

export interface IDealService {
  createDeal(dto: CreateDealDto): Promise<void>;
}

@Injectable()
export class DealService implements IDealService {
  constructor(private crmService: CrmService) {}

  async createDeal(dto: CreateDealDto): Promise<void> {
    let id;

    try {
      const user = await this.crmService.queryUser(dto);
      console.log('USER', user);
      id = await this.crmService.updateUser(user);
    } catch (err) {
      console.log('err');
      id = await this.crmService.createUser(dto);
    }

    await this.crmService.createDeal({ ...dto, id });
  }
}
