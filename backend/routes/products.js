const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const { findByIdAndDelete } = require("../models/Product");
let Product = require("../models/Product");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, product) => {
    res.json(product);
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.route("/add").post(upload.single("image"), (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const stock = req.body.stock;
  const image = req.file.filename;
  console.log("got data");

  const newProductData = {
    name,
    category,
    price,
    stock,
    image,
  };

  const newProduct = new Product(newProductData);

  newProduct
    .save()
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.name = req.body.name;
      product.category = req.body.category;
      product.price = req.body.price;
      product.stock = req.body.stock;
      product.image = product.image;

      product
        .save()
        .then(() => res.json("Product Updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

router.route("/delete").post((req, res) => {
  const products = req.body;
  const query = { _id: { $in: products } };
  Product.deleteMany(query)
    .then(() => res.json("Deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
