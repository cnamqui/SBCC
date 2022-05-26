 
import cron from 'node-cron';
import disburse from "./disburse.js";

/* Schedule disbursments to run every monday
    https://www.npmjs.com/package/node-cron
*/
cron.schedule('* * * * * 1',()=>{ 
    disburse().catch(e => console.log(e))
});