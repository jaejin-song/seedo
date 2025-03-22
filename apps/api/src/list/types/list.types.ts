/**
 * ListItem
 */
export interface ListItem {
  assetType: AssetType;
  exchange: Exchange;
  name: string;
  symbol: string;
  trending?: boolean | null;
  [property: string]: any;
}

export type AssetType = 'Stock' | 'ETF';

export type Exchange = 'NASDAQ' | 'NYSE' | 'NYSE ARCA' | 'NYSE MKT' | 'BATS';
