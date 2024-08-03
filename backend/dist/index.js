"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const HealthCheck_1 = __importDefault(require("./routes/ping/HealthCheck"));
const CryptoPrice_1 = __importDefault(require("./routes/api/CryptoPrice"));
const Constant_1 = require("./constant/Constant");
require("./util/UpdateCryptoPriceCronJob");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST'],
}));
const server = (0, http_1.createServer)(app);
// Initialize socket.io server
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
app.use(express_1.default.json());
app.use('/ping', HealthCheck_1.default);
app.use('/api', CryptoPrice_1.default);
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Example event listener
    socket.on('ping', (data) => {
        console.log('Ping received:', data);
        socket.emit('pong', { message: 'Pong!' });
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(Constant_1.MONGODB_URI);
        console.log('Connected to the database');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
});
const startServer = () => {
    server.listen(Constant_1.port, () => {
        console.log(`Server listening on port ${Constant_1.port}`);
    });
};
connectToDB().then(startServer);
