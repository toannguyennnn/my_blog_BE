require("dotenv").config();

const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const initAPIRoute = require("./routes/api");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8000;
const hostname = process.env.HOST_NAME;

//config template engine
configViewEngine(app);

// Register the bodyParser middleware here
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
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
