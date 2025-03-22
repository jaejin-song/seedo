import { Module } from '@nestjs/common';

import { CalculatorModule } from './calculator/calculator.module';
import { DatabaseModule } from './database/database.module';
import { LinksModule } from './links/links.module';
import { ListModule } from './list/list.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, LinksModule, ListModule, CalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
