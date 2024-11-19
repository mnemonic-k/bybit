import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ByBitProviders } from './providers/bybit.providers';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ...ByBitProviders],
})
export class AppModule {}
