const { ObjectId } = require("mongodb");
const db = require("../../config/mongodb");

const index = (req, res) => {
    db.collection("products")
        .find()
        .toArray()
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
};
const view = (req, res) => {
    const { id } = req.params;
    db.collection("products")
        .findOne({ _id: new ObjectId(String(id)) })
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
};
const store = (req, res) => {
    const { name, price, stock } = req.body;
    db.collection("products")
        .insertOne({ name, price, stock, status: true })
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
};

module.exports = { index, view, store };
