const express = require("express");
require("./src/config");
const Product = require("./src/product");

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello from Express Server");
});

app.post("/create", async (req, res) => {
  let data = new Product(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

app.get("/list", async (req, res) => {
  let data = await Product.find();
  res.send(data);
});

app.delete("/delete/:_id", async (req, res) => {
  let data = await Product.deleteOne(req.params);
  res.send(data);
});

app.put("/update/:_id", async (req, res) => {
  let data = await Product.updateOne(req.params, { $set: req.body });
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
