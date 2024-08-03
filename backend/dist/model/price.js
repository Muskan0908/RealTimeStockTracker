"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const priceSchema = new mongoose_1.default.Schema({
    symbol: String,
    name: String,
    price: Number,
    allTimeHighUSD: Number,
    timestamp: { type: Date, default: Date.now },
});
//Indexing to speed up queries
priceSchema.index({ name: 1, timestamp: -1 });
exports.default = mongoose_1.default.model('Price', priceSchema);
