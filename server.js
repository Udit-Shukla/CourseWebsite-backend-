const bodyParser = require("body-parser");
const express= require("express");
const app= express();
const cors= require("cors");
require("dotenv").config();
const routes= require("./Routes/routes");
const { dbConnect } = require("./Config/dbConnect");
app.use(bodyParser.json());
app.use(cors());

//defining routes 
app.use("/api", routes);

//connecting to database
dbConnect();
app.listen(process.env.PORT, () => {
    console.log("Server running on port: ", process.env.PORT);
}
);