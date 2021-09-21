const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, reguired: true, unique: true},
        desc:  {type: String,required: true},
        img: {type: String,required: true},
        size: {type: String},
        colour: {type: String},
        price: {type: Number,required: true},
        categories: {type: Array},


    }, {timestamps: true});

    module.exports = mongoose.model("Product", ProductSchema);