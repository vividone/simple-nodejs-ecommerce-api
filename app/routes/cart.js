const router = require('express').Router();
const Cart = require('../models/Cart');
const {accountAuthorization, adminAuthorization} = require('./verifytoken');




// Create Cart
router.post("/",accountAuthorization, async(req, res) => {

    const userCart = new Cart(req.body);

    // console.log(newProduct);
    try {
        const savedCart = await userCart.save();
        res.status(201).json(savedCart)
    } catch (error) {
        res.status(400).json(error)
    }    
});
// List all Carts

router.get("/view",adminAuthorization, async (req, res) => {

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
              const  carts = await Cart.find();
                 return res.status(200).json(carts);

        } catch (error) {
            return res.status(404).json(error);
        }
});

// All cart by specific user
router.get("/user/:id",adminAuthorization, async (req, res) => {

    try {
          const  cart = await Cart.findOne({userId: req.params.id});
             return res.status(200).json(cart);

    } catch (error) {
        return res.status(404).json(error);
    }
});


// Update a Cart
router.put("/:id", accountAuthorization, async(req, res) => {

    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        return res.status(201).json(updateCart);
    } catch (error) {
        return res.status(403).json(error)
    }
});
// // Delete a Cart
router.delete("/:id", accountAuthorization, async(req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(201).json("Cart Deleted.");
    } catch (error) {
        return res.status(403).json(error)
    }
});
module.exports = router;