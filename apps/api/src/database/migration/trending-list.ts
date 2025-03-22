import { eq } from 'drizzle-orm';
import { DrizzleClient as db } from '../database.module';
import { listTable } from '../schema/list';
import { trendingStocks } from '../const/trending-list';

async function main() {
  try {
    for await (const symbol of trendingStocks) {
      await db
        .update(listTable)
        .set({
          trending: true,
        })
        .where(eq(listTable.symbol, symbol));
    }

    console.log('Trending list update completed');
  } catch (error) {
    console.error('Trending list update failed : >>', error);
  }
}

main();
