const express = require("express");
const apiRouter = require("./routes");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");

app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.listen(process.env.PORT || "3000", () => {
  console.log(`server is runing on port : ${process.env.PORT || "3000"}`);
});
