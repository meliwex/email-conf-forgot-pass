const mongoose = require("mongoose");


const connectDb = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
      console.error(err);
    });
}


module.exports = connectDb;