const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Field nama harus ada"],
    },
    price: {
        type: Number,
        required: true,
    },
    stock: Number,
    status: {
        type: Boolean,
        default: true,
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
