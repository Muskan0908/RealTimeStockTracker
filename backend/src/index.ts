import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import pingRouter from './routes/ping/HealthCheck';
import cryptoPriceRouter from './routes/api/CryptoPrice';
import { MONGODB_URI, port } from './constant/Constant';
import './util/UpdateCryptoPriceCronJob';

const app = express();
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
}));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use('/ping', pingRouter);
app.use('/api', cryptoPriceRouter);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('ping', (data) => {
    console.log('Ping received:', data);
    socket.emit('pong', { message: 'Pong!' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); 
  }
};

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

connectToDB().then(startServer);

export { io };
