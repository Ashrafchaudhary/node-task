const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./helper/dbConnection");
require("dotenv").config();

const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", loginRoutes);
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on ${process.env.PORT}`);
});
