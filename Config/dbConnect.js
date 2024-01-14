const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect =()=>{ mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err)
    console.log("Error connecting to database");
    process.exit(1);
  });
}