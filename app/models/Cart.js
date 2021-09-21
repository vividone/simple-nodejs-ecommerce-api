const mongoose = require('mongoose');

        const CartSchema = new mongoose.Schema(
            {
                userId: {
                    type: String,
                    reguired: true, 
                },
                products:[{
                    productId: {type:String},
                    qty: {type:Number, default: 1},
                }],
            }, {timestamps: true});
        
            module.exports = mongoose.model("Cart", CartSchema);