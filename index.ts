import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (_req, res) => {
    res.send('✅ MongoDB connected successfully!');
  });

mongoose.connect(process.env.MONGO_URI!).then(() => {
    server.listen(3100, () => {
        console.log('Server is running on port 3000');
    }).on('error', (err: Error) => {
        console.error('[Server] Error starting server: ', err);
        process.exit(1);
    });
}).catch((err: Error) => {
    console.error('[MongoDB] Error connecting to MongoDB: ', err);
    process.exit(1);
});

