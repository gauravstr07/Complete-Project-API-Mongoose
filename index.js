const express = require('express');
require('./src/config');
const Product = require('./src/product')

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
    res.send("Hello from Express Server");
})

app.post("/create", async(req, res) => {
    let data = new Product(req.body);
    let result = await data.save();
    console.log(req.body);
    res.send(result);
   
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})