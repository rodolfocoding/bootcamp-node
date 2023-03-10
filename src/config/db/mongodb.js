const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qkmop.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Database successfully connected!");
    })
    .catch((err) => console.log(err));
}

module.exports = connect;
