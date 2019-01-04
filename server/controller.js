module.exports = {
  inventoryGet: (req, res, next) => {
    const db = req.app.get("db");
    db.get_inventory()
      .then(inventory => {
        res.status(200).send(inventory);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "Oops! Something went wrong. Our engineers have been informed!"
        });
        console.log("Error read products");
        console.log(err);
      });
  },

  inventoryPost: (req, res, next) => {
    const db = req.app.get("db");
    const { name, price, image } = req.body;
    db.create_product({ name, price, image })
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "Oops! Something went wrong. Our engineers have been informed!"
        });
        console.log("Error read products");
        console.log(err);
      });
  },

  inventoryDelete: (req, res, next) => {
    const db = req.app.get("db");
    const id = req.params.id;

    db.delete_product({ id })
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "Oops! Something went wrong. Our engineers have been informed!"
        });
        console.log("Error delete products");
        console.log(err);
      });
  },

  inventoryPut: (req, res, next) => {
    const db = req.app.get("db");
    const id = req.params.id;
    const { name, price, image } = req.body;

    db.update_product({ id, name, price, image })
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "Oops! Something went wrong. Our engineers have been informed!"
        });
        console.log("Error put products");
        console.log(err);
      });
  },

  productGet: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.get_product({ id })
      .then(product => {
        res.status(200).send(product[0]);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "Oops! Something went wrong. Our engineers have been informed!"
        });
        console.log("Error get product");
        console.log(err);
      });
  }
};
