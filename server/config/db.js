const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose
    .connect("mongodb://0.0.0.0/crm_mern")
    .then(() => console.log("Connection established"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
