const mongoose = require("mongoose");
require("dotenv").config();

ConnectDb = async () => {
  try {
    const mongoDbURL = process.env.MONGODBCONNECTIONSTRING;

    const connection = await mongoose.connect(mongoDbURL);

    console.log("___---Mongodb connected___---");

    return connection;
  } catch (error) {
    console.log("error in mongodb connection", error);
  }
};
module.exports = { ConnectDb };
