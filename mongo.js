const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/polyglot_ninja";


module.exports = function (app) {
    MongoClient.connect(MONGO_URL)
        .then((connection) => {
            app.customerdb = connection.collection("customerdb");
            console.log("Database connection established")
        })
        .catch((err) => console.error(err))

};