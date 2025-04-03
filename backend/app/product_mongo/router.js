const router = require("express").Router();
const productController = require("./controller");

router.get("/product", productController.index);
router.get("/product/:id", productController.view);
router.post("/product", productController.store);

module.exports = router;
