const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/floodhelp";
mongoose.connect(dbUrl);
console.log("Database connected.");