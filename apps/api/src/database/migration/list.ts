import { ListItem } from 'src/list/types/list.types';
import { DrizzleClient as db } from '../database.module';
import { listTable } from '../schema/list';
import { parse } from 'csv-parse';

async function main() {
  const baseUrl = 'https://www.alphavantage.co/query';
  const params = {
    function: 'LISTING_STATUS',
    apikey: process.env.ALPHA_API_KEY!,
  };
  const queryString = new URLSearchParams(params).toString();

  try {
    const res = await (await fetch(`${baseUrl}?${queryString}`)).text();

    const records: ListItem[] = [];
    const parser = parse(res, {
      columns: true,
      skip_empty_lines: true,
    });

    for await (const record of parser) {
      const { symbol, name, exchange, assetType } = record;

      if (symbol && name) {
        records.push({ symbol, name, exchange, assetType });
      }
    }

    await db.delete(listTable);
    await db.insert(listTable).values(records);

    console.log('List table update completed');
  } catch (error) {
    console.error('Migration failed : >> ', error);
  }
}

main();
