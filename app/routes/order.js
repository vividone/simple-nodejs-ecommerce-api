const router = require('express').Router();
const Order = require('../models/Order');
const {accountAuthorization, adminAuthorization} = require('./verifytoken');




// Create New Order
router.post("/",accountAuthorization, async(req, res) => {

    const userOrder = new Order(req.body);

    // console.log(newProduct);
    try {
        const savedOrder = await userOrder.save();
        res.status(201).json(savedOrder)
    } catch (error) {
        res.status(400).json(error)
    }    
});
// List all Orders

router.get("/view", adminAuthorization, async (req, res) => {

        try {

            //  let products = [];

            // if(qNew){
            //       products = await Product.find().sort({createdAt: -1}).limit(5);
            //     return res.status(200).json(products);
            // }else if(qCategory){
            //      products = await Product.find({
            //         categories: {
            //                     $in: [qCategory],
            //                     },
            // });
            // return res.status(200).json(products);
            // }else{
            //        products = await Product.find();
            //     return res.status(200).json(products);
            // }
              const  orders = await Order.find();
                 return res.status(200).json(orders);

        } catch (error) {
            return res.status(404).json(error);
        }
});

// All order by specific user
router.get("/user/:id", adminAuthorization, async (req, res) => {

    try {
          const  order = await Order.findOne({userId: req.params.id});
             return res.status(200).json(order);

    } catch (error) {
        return res.status(404).json(error);
    }
});


// Update a Order
router.put("/:id", accountAuthorization, async(req, res) => {

    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        return res.status(201).json(updateOrder);
    } catch (error) {
        return res.status(403).json(error)
    }
});
// // Delete a Order
router.delete("/:id", adminAuthorization, async(req, res) => {

    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(201).json("Order Deleted.");
    } catch (error) {
        return res.status(403).json(error)
    }
});

// Get Monthly Order

router.get("/income", adminAuthorization, async (req, res) => {

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income  = await Order.aggregate([
            { $match: { createdAt: {$gte: previousMonth} }},
            { $project: { 
                month: { $month: "$createdAt"}, 
                sales: {$amount, }
            },
                $group: {
                    _id: $month,
                    total:{$sum: "$sales"}
                }}
        ]);
        res.status(200).json(income);
    } catch (error) {
        return res.status(403).json(error)

    }
})
module.exports = router;