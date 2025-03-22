import { Injectable } from '@nestjs/common';
import { ListRepository } from './list.repository';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async getList() {
    try {
      return await this.listRepository.getList();
    } catch (error) {
      console.error('Failed to fetch list');
      throw error;
    }
  }

  async getTrendingList() {
    try {
      return await this.listRepository.getTrendingList();
    } catch (error) {
      console.error('Failed to fetch trending list');
      throw error;
    }
  }
}
