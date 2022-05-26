import { Merchant } from "./merchants.js";
import { Order } from "./orders.js";
import { Shopper } from "./shoppers.js";
import { Disbursement } from "./disbursements.js";
import mongoose from "mongoose";
import config from '../config/index.js';

const Db ={
    connect: async ()=>{ 
        const dbConfig = config.get('dbConfig');    
        const secrets = config.secure('dbConfig');   
        await mongoose.connect(`mongodb://${secrets.username}:${secrets.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.defaultDb}?authSource=${dbConfig.authDb}`);
    }
}

export {
    Merchant,
    Order,
    Shopper,
    Disbursement,
    Db
}