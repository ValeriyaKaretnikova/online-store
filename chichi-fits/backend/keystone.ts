import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { Product } from './schemas/Product';
import { User } from './schemas/User';
import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL ||
  'mongodb://localhost/keystone-chichi-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      onConnect(keystone) {
        console.log('Connection');
        // if (process.argv.includes('--seed-data')) {
        //   await insertSeedData(keystone);
        // }
      },
    },
    lists: createSchema({
      // Schemaitems go here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Change this for roles
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
