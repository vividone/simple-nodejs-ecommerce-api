const request  = require("express");
const PayStack = require('paystack-node');

router.post("/payment", (req, res)=> {

    const paystack = new PayStack(process.env.APIKEY, process.env.NODE_ENV)

    const feesCalc = new PayStack.Fees();
    const feeCharge = feesCalculator.calculateFor(req.body.amount)

})