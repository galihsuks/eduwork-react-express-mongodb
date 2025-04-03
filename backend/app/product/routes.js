const router = require("express").Router();
const Product = require("./model");

router.post("/", async (req, res) => {
    try {
        // const { name, price, stock, active, image_url } = req.body;
        await Product.sync();
        const result = await Product.create(req.body);
        res.status(200).json({
            message: "Produk baru berhassil ditambahkan",
            data: result.dataValues,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/", async (req, res) => {
    try {
        const result = await Product.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const result = await Product.findOne({
            where: { product_id: req.params.id },
        });
        res.status(200).json(
            result ? result : { message: "Produk tidak ditemukan" }
        );
    } catch (error) {
        res.status(500).json(error);
    }
});
router.put("/:id", async (req, res) => {
    try {
        // const { name, price, stock, active, image_url } = req.body;
        const result = await Product.update(req.body, {
            where: {
                product_id: req.params.id,
            },
        });
        res.status(200).json(
            result[0] == 0
                ? { message: "Produk tidak ditemukan" }
                : { message: "Produk berhasil diupdate" }
        );
    } catch (error) {
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const result = await Product.destroy({
            where: {
                product_id: req.params.id,
            },
        });
        res.status(200).json(
            result == 0
                ? { message: "Produk tidak ditemukan" }
                : { message: "Produk berhasil dihapus" }
        );
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
