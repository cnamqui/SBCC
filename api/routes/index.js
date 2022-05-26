import express from 'express' 
const router = express.Router()
import {Disbursement,Merchant} from "../../data-models/index.js"
import moment from 'moment';
/*
calculated weekly with start of week on sunday midnight
can specify week by adding a query param like so:
/disbursments/:merchantId?date=ISODate
*/
router.get('/disbursments/:merchantId',async (req, res) => {
    const dateParam = req.query.date? moment(req.query.date) : moment();
    const startOfWeek = moment(dateParam).startOf('week');
    const endOfWeek = moment(dateParam).endOf('week');
    console.log(startOfWeek)
    console.log(endOfWeek)
    const disbs = await Disbursement.find({
        merchant_id:req.params.merchantId,
        $and:[
            {created_at: {$gte:startOfWeek.toDate()}},
            {created_at: {$lte:endOfWeek.toDate()}},
        ]
    });
    res.send(disbs);
})
/*
calculated weekly with start of week on sunday midnight
can specify week by adding a query param like so:
/disbursments?date=ISODate
*/
router.get('/disbursments', async (req, res) => {
    const dateParam = req.query.date? moment(req.query.date) : moment();
    const startOfWeek = moment(dateParam).startOf('week');
    const endOfWeek = moment(dateParam).endOf('week');
    console.log(startOfWeek)
    console.log(endOfWeek)
    const disbs = await Disbursement 
    .find({ 
        $and:[
            {created_at: {$gte:startOfWeek.toDate()}},
            {created_at: {$lte:endOfWeek.toDate()}},
        ]
    });
    res.send(disbs);
})






export default router; 