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
exports.fetchCryptoData = void 0;
const axios_1 = __importDefault(require("axios"));
const Constant_1 = require("../constant/Constant");
const price_1 = __importDefault(require("../model/price"));
const __1 = require("..");
const fetchCryptoData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('In fetchCryptoData');
    Constant_1.symbols.forEach((symbol) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(Constant_1.API_URL + `/coins/single`, {
            currency: "USD",
            code: symbol,
            meta: true
        }, {
            headers: {
                'x-api-key': Constant_1.API_KEY
            }
        });
        const cryptoData = response.data;
        console.log(cryptoData);
        let newData = yield price_1.default.insertMany({
            symbol: symbol,
            name: cryptoData.name.toLowerCase(),
            price: cryptoData.rate,
            allTimeHighUSD: cryptoData.allTimeHighUSD,
        });
        if (Array.isArray(newData)) {
            console.log('newData is Array');
        }
        console.log(newData);
        __1.io.emit('UPDATE_DATA', newData);
        console.log('Data Updated!');
    }));
});
exports.fetchCryptoData = fetchCryptoData;
