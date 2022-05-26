import {Db,Merchant,Order,Shopper,Disbursement} from "../data-models/index.js"
import Decimal from 'decimal';
import moment from 'moment';
/*
1% fee for amounts smaller than 50 €
0.95% for amounts between 50€ - 300€
0.85% for amounts over 300€
*/
export default async function disburse(){
    await Db.connect();
    console.log("RAWR");
    const orders = await  Order.find({completed_at:{$ne:null},disbursement_processed_on:{$eq:null}}).populate('merchant');
    
    for(let o of orders){
        const amt = calculateDisbursement(o);
        await Disbursement.create({
            merchant_id: o.merchant_id,
            amount: amt.toNumber(),
            created_at: moment().toDate(),
            merchant: o.merchant,
            order:o
        })
        o.set({disbursement_processed_on : moment().toDate()});
        await o.save();
    }
}
// we use Decimal.js for any currency computation in JS to avoid any discrepancies
// https://mikemcl.github.io/decimal.js/
function calculateDisbursement(order){
    const amt = new Decimal(order.amount)
    let perc;
    if(amt< new Decimal('50')){ 
        perc = new Decimal('0.01');
    }else if(amt>= new Decimal('50') &&amt<= new Decimal('300') ){
        perc = new Decimal('0.0095'); 
    }else{
        perc = new Decimal('0.0085'); 
    }
    return amt.mul(perc);
    
}