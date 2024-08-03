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
const node_cron_1 = __importDefault(require("node-cron"));
const CryptoPriceService_1 = require("../service/CryptoPriceService");
const price_1 = __importDefault(require("../model/price"));
// Update Price every 5 seconds '*/5 * * * * *'
node_cron_1.default.schedule('*/10 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Updating Data from API');
        yield (0, CryptoPriceService_1.fetchCryptoData)();
        console.log('Crypto data fetched successfully');
    }
    catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}));
// Delete 5 minutes previous data
node_cron_1.default.schedule('*/10 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting to delete old data');
        const oneDayAgo = new Date(Date.now() - 30 * 1000);
        yield price_1.default.deleteMany({ timestamp: { $lt: oneDayAgo } });
        console.log('Old prices deleted successfully');
    }
    catch (error) {
        console.error('Error deleting old prices:', error);
    }
}));
