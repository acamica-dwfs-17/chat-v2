const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const ws = require("./ws");


const app = express();
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/ws.html");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

app.use("/user", userRouter);
