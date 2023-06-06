const express = require("express");

const app = express();
const publicDir = `${__dirname}/public/`;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(publicDir + "index.html");
});

console.log("App listening on port 3000");
app.listen(3000);
