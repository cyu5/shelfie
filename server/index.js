const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const massive = require("massive");
const dotenv = require("dotenv");
const controller = require("./controller.js");

dotenv.config();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(database => {
    app.set("db", database);
  })
  .catch(err => console.log(`Error connecting db: `, err));

app.get("/api/inventory", controller.inventoryGet);

app.get("/api/product/:id", controller.productGet);

app.post("/api/product", controller.inventoryPost);

app.delete("/api/product/:id", controller.inventoryDelete);

app.put("/api/product/:id", controller.inventoryPut);

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
