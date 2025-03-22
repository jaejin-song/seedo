import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema/users';

const db = drizzle({
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john2@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!');

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!');

  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log('User deleted!');
}

main();
