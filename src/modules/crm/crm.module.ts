import { Module } from '@nestjs/common';

import { CrmService } from './crm.service';

@Module({
  imports: [],
  providers: [CrmService],
  exports: [CrmService],
})
export class CrmModule {}
