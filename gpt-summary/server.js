const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 requests per 1 minute
  max: 10,
});
const publicDir = `${__dirname}/public/`;

app.use(limiter);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(publicDir + "index.html");
});

app.get("*", (req, res) => {
  res.sendFile(publicDir + "404.html");
});

console.log("App listening on port 3000");
console.log("Open your app at http://localhost:3000");
app.listen(3000);
