import { Inject, Injectable } from '@nestjs/common';
import { listTable } from '../database/schema/list';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, ilike, or } from 'drizzle-orm';

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

  async getSearchList(search: string){
    const keyword = `%${search}%`;

    return await this.db.select().from(listTable).where(
      or(
        ilike(listTable.symbol, keyword),
        ilike(listTable.name, keyword),
      )
    ).limit(30);
  }
}
