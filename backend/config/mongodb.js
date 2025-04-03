const { MongoClient } = require("mongodb");

const url = "mongodb://eduwork:Eduwork1234@localhost:27017?authSource=admin";
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
