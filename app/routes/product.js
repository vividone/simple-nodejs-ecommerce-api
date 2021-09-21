const router = require('express').Router();
const Product = require('../models/Product');
const {accountAuthorization, adminAuthorization} = require('./verifytoken');




// Create Product
router.post("/", adminAuthorization, async(req, res) => {
    // const data = req.body;

    // const newProduct = new Product ({
    //     name: data.name,
    //     desc: data.desc,
    //     img: data.img,
    //     size: data.size,
    //     colour: data.colour,
    //     price: data.price,
    //     categories: data.categories
    // });

    const newProduct = new Product(req.body);

    // console.log(newProduct);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(400).json(error)
    }    
});
// List all Products

router.get("/", async (req, res) => {

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
              const  products = await Product.find();
                 return res.status(200).json(products);

        } catch (error) {
            return res.status(404).json(error);
        }
});

// Product Detail

router.get("/detail/:id", async (req, res)=> {

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json(error)
    }
});
// Update a Product
router.put("/:id", adminAuthorization, async(req, res) => {

    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        return res.status(201).json(updateProduct);
    } catch (error) {
        return res.status(403).json(error)
    }
});
// Delete a Product
router.delete("/:id", adminAuthorization, async(req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(201).json("Product Deleted.");
    } catch (error) {
        return res.status(403).json(error)
    }
});
module.exports = router;