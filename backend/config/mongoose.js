require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URI;
console.log("URI mongo");
console.log(url);
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Server mongodb terubung dgn mongoose");
});
