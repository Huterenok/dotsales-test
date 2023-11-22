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
    const user = await this.crmService.queryUser(dto);

    let id;
    if (user) {
      id = await this.crmService.updateUser({ ...dto, id: user.id });
    } else {
      id = await this.crmService.createUser(dto);
    }

    await this.crmService.createDeal({ ...dto, id });
  }
}
