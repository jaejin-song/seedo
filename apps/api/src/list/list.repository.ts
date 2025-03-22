import { Inject, Injectable } from '@nestjs/common';
import { listTable } from '../database/schema/list';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

@Injectable()
export class ListRepository {
  constructor(@Inject('DATABASE') private readonly db: NodePgDatabase) {}

  async getList() {
    return await this.db.select().from(listTable);
  }

  async getTrendingList() {
    return await this.db
      .select()
      .from(listTable)
      .where(eq(listTable.trending, true));
  }
}
