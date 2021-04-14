//doing my mongodb connection here instead of the server file
const mongoose = require('mongoose')

const connectDB = mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/econnection",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => {
      console.log("Mongoose Is Connected");
    }
  );

  module.exports = connectDB