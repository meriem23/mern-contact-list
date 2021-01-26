const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();

var cors = require('cors')
// DON'T KNOW WHY BUT IT MAKES IT WORK 
app.use(cors())
// 4 Set up JSON middleware
app.use(express.json());
//3 Set up env variables
require("dotenv").config({ path: "./config/.env" });
// 2 - Connect the DB
connectDB();
// 5 Connect the user routes
app.use("/api/users", require("./routes/userRoutes"));
// 1- Start the Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
