import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL ||
  'mongodb://localhost/keystone-chichi-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // ADd data seeding
  },
  lists: createSchema({
    // Schemaitems go here
  }),
  ui: {
    // Change this for roles
    isAccessAllowed: () => true,
  },
  // Add session values here
});
