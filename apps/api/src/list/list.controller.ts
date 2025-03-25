import { Controller, Get, Query } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getList() {
    const data = await this.listService.getList();

    return {
      success: true,
      data,
    };
  }

  @Get('/trending')
  async getTrendingList() {
    const data = await this.listService.getTrendingList();

    return {
      success: true,
      data,
    };
  }

  @Get('/search')
  async getSearchList(@Query('search') search: string){
    const data = await this.listService.getSearchList(search);

    return {
      success: true,
      data,
    }
  }
}
