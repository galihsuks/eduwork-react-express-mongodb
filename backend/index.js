require("./config/mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
// const productRouter = require("./app/product/routes");
const productRouterMongo = require("./app/product_mongo/router");
const productRouterMongoose = require("./app/product_mongo_v2/router");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Tugas Eduwork");
});

app.use("/api/v1", productRouterMongo);
app.use("/api/v2", productRouterMongoose);

app.listen(port, () => {
    console.log(`Backend Absensi app listening on port ${port}`);
});
