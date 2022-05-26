import {Db,Merchant,Order,Shopper} from "../data-models/index.js"
import merchantsSample from './resources/merchants.json' assert { type: 'json' };  
import shoppersSample from './resources/shoppers.json' assert { type: 'json' }; 
import ordersSample from './resources/orders.json' assert { type: 'json' }; 
import moment from 'moment'; 

bootstrap().catch(err => console.log(err));

async function bootstrap(){ 
    // const dbConfig = config.get('dbConfig');    
    // const secrets = config.secure('dbConfig');   
    // await mongoose.connect(`mongodb://${secrets.username}:${secrets.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.defaultDb}?authSource=${dbConfig.authDb}`);
    await Db.connect();
    console.log('Creating Sample Shoppers');
    await Shopper.insertMany(shoppersSample.RECORDS)
    console.log('Creating Sample Orders');
    
    console.log('Creating Sample Merchants')   
    await Merchant.insertMany(merchantsSample.RECORDS)

    // manually parse each date so mongoose doesn't throw an error
    // also manually add the object id since I went with mongo before looking at the sample data. this really should've been an sql db
    for(let r of ordersSample.RECORDS){
        let _r = r;  
        const createdAt = moment(r.created_at,"DD/MM/YYYY HH:mm:ss").toDate()  
        const completedAt = r.completed_at ? moment(r.completed_at,"DD/MM/YYYY HH:mm:ss").toDate() : null;
        _r.created_at = createdAt 
        _r.completed_at = completedAt
        if(!completedAt){
            delete r.completed_at;
        }
        const merchant = await Merchant.findOne({id:_r.merchant_id});
        const shopper = await Shopper.findOne({id:_r.shopper_id});

        _r.merchant = merchant;
        _r.shopper = shopper; 
        await Order.create(_r);
    }; 
    // await Order.insertMany(newOrders);

    
    console.log('Done')   
    process.exit();
}