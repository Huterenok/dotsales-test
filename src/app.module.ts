import { Module } from '@nestjs/common';

import { DealModule } from 'modules';
import { ConfigurationModule } from 'config/configuration.module';
import { CrmModule } from 'modules/crm/crm.module';

@Module({
  imports: [DealModule, CrmModule, ConfigurationModule],
})
export class AppModule {}
