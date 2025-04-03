require("./config/mongoose");
const express = require("express");
const app = express();
const port = 8083;
const cors = require("cors");
// const productRouter = require("./app/product/routes");
// const productRouterMongo = require("./app/product_mongo/router");
const productRouterMongoose = require("./app/product_mongo_v2/router");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Tugas Eduwork");
});

// app.use("/product", productRouterMongo);
app.use("/api/mongoose", productRouterMongoose);

app.listen(port, () => {
    console.log(`Backend Absensi app listening on port ${port}`);
});
