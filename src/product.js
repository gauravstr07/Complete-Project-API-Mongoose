const mongoose = require("mongoose");


// We are defining Schema
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String
})

module.exports = mongoose.model('products', productSchema);

