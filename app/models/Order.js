const mongoose = require('mongoose');

        const OrderSchema = new mongoose.Schema(
            {
                userId: {
                    type: String,
                    reguired: true, 
                },
                products:[{
                    productId: {type:String},
                    qty: {type:Number, default: 1},
                }],
                amount: {
                    type: Number,
                    reguired: true, 
                },
                address: {
                    type: Object,
                    reguired: true, 
                },
                status: {
                    type: String,
                    default: "pending", 
                },
            }, {timestamps: true});
        
            module.exports = mongoose.model("Order", OrderSchema);