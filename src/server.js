require("dotenv").config();

const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const initAPIRoute = require("./routes/api");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");

const app = express();

const port = process.env.PORT || 8000;
const hostname = process.env.HOST_NAME;

//config template engine
configViewEngine(app);

// Register the bodyParser middleware here
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//routes
app.use("/", webRoutes);

//init API route
initAPIRoute(app);

connectDB();

app.listen(port, hostname, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
