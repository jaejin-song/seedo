import { Global, Module } from '@nestjs/common';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DrizzleClient = drizzle({
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useValue: DrizzleClient,
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
