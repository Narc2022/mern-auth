const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sachin:sachin243$@cluster0.p3rkz.mongodb.net/mern_auth",
  {
    serverSelectionTimeoutMS: 5000,
  }
);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDb");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error : ${err}`);
});

module.exports = mongoose;
