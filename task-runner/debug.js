import disburse from "./disburse.js";


(async function(){
    console.log("Disbursment start");
    await disburse();
    console.log("Disbursment done");
    process.exit();
})();