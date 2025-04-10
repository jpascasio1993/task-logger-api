import express, { RequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import router from './routers';
import { inject } from './routers/middleware/middleware';

const server = express();

server
  .use(helmet())
  .use(
    cors({
      origin: (requestOrigin, callback) => {
        // if (process.env.NODE_ENV === 'development' || _includes(allowedOrigins, requestOrigin)) {
        //     callback(null, true);
        //     return;
        // }
        // callback(new Error('Not allowed by CORS'));
        callback(null, true);
        return;
      },
    }),
  )
  .use(express.json())
  .use(inject as RequestHandler)
  .use(router);

server.get('/', (_req, res) => {
  res.send('✅ MongoDB connected successfully!');
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    server
      .listen(3000, () => {
        console.log('Server is running on port 3000');
      })
      .on('error', (err: Error) => {
        console.error('[Server] Error starting server: ', err);
        process.exit(1);
      });
  })
  .catch((err: Error) => {
    console.error('[MongoDB] Error connecting to MongoDB: ', err);
    process.exit(1);
  });
