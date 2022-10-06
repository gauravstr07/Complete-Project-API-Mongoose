const express = require("express");
require("./src/config");
const Product = require("./src/product");

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello from Express Server");
});

// Adding Data
app.post("/create", async (req, res) => {
  let data = new Product(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

// Getting Data
app.get("/list", async (req, res) => {
  let data = await Product.find();
  res.send(data);
});

//Deleting By Using Id
app.delete("/delete/:_id", async (req, res) => {
  let data = await Product.deleteOne(req.params);
  res.send(data);
});

// Updating By Using Id
app.put("/update/:_id", async (req, res) => {
  let data = await Product.updateOne(req.params, { $set: req.body });
  res.send(data);
});

// Searching in DB
app.get("/search/:key", async(req, res) => {

    let data = await Product.find(
        {
            "$or":[
                {"name": {$regex:req.params.key}},
                {"brand": {$regex:req.params.key}},
                {"category": {$regex:req.params.key}}
            ]
        }
    );
    res.send(data)
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
