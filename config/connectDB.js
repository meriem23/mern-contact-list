const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const mongo_url = process.env.MONGO_URL;
function connectDB() {
  mongoose.connect(
    mongo_url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      else console.log("The DB is connected 🥳...");
    }
  );
}

module.exports = connectDB;
