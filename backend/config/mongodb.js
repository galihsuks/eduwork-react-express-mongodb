require("dotenv").config();

const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
console.log("url nya mongodb bukan mongoose");
console.log(url);
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
        console.log("Koneksi ke mongodb berhasil");
    } catch (error) {
        console.log(error);
    }
})();

const db = client.db("eduwork");

module.exports = db;
