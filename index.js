const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

//

const api = require("./routes/api/tasks");
const Task = require("./models/task");
const User = require("./models/user");
const { response } = require("express");
const { resolve } = require("path");

const app = express();

app.use(bodyParser.json());

const db = process.env.URI;

mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

//use routes
app.use("/api", api);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); //relative path
  });
}

// ...
// Right before your app.listen(), add this:

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
