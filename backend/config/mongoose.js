const mongoose = require("mongoose");

const url =
    "mongodb://eduwork:Eduwork1234@localhost:27017/eduwork?authSource=admin";
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Server mongodb terubung dgn mongoose");
});
