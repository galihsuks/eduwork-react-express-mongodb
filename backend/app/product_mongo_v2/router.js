const router = require("express").Router();
const Product = require("./model");

router.post("/product", (req, res) => {
    const { name, price, stock } = req.body;
    Product.create({ name, price, stock, status: true })
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
});
router.get("/product", (req, res) => {
    Product.find()
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
});
router.get("/product/:id", (req, res) => {
    Product.findById(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
});
router.put("/product/:id", (req, res) => {
    const { name, price, stock, status } = req.body;
    Product.findById(req.params.id)
        .updateOne({ name, price, stock, status })
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
});
router.delete("/product/:id", (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
});
router.post("/product/search", (req, res) => {
    const { search } = req.body;
    Product.find({ name: { $regex: ".*" + search + ".*", $options: "i" } })
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
});

module.exports = router;
