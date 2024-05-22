const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const uri = `mongodb+srv://esdrasTodo:13579@cluster1.uy4rhr2.mongodb.net/?retryWrites=true&w=majority`;

const connection = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = connection;
