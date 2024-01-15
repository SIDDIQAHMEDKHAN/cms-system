const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose
    .connect(process.env.MOONGODB_URL)
    .then(() => console.log("Connection established"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
