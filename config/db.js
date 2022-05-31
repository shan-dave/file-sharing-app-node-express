const mongoose = require('mongoose')
require('dotenv').config();

function dbConnection() {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    });
    const con = mongoose.connection
    con.once("open", () => {
        console.log("Database Connected!!!!!")
    })
}

module.exports =  dbConnection;