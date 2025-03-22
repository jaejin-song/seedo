import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListRepository } from './list.repository';

@Module({
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
