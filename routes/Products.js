const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const multer = require("multer");
//new product

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(JPG|PNG|jpeg)$/)) {
      return cb(new Error("Please upload an Image"));
    }
    cb(undefined, true);
    // cb(new Error('File must be image'))
    // cb(undefined,true)
    // cb(undefined,False)
  },
});
router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    console.log(req.Prod);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.post("/newproduct", upload.single("image"), async (req, res) => {
  const product = new Product(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      seller: req.body.seller,
      image:req.file.buffer,
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );

  try {
    const savedProduct = await product.save();
    res.status(200).json({ savedProduct, success: 1 });
  } catch (err) {
    res.json({ message: err, success: 0 });
  }
});
//get all the productss
router.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(200).json(Products);
  } catch (err) {
    res.json({ message: err });
  }
});
//get product by id
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.productId });
    res.status(200).json({ product, success: 1 });
  } catch (err) {
    res.json({
      message: err,
      success: 0,
    });
  }
});
//deleting a post
router.delete("/:productId", async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.productId });
    res.status(200).json({ removedProduct, success: 1 });
  } catch (err) {
    res.json({ message: err, success: 0 });
  }
});

router.patch("/:productId", async (req, res) => {
  try {
    const updatedOne = await Product.updateOne(
      { _id: req.params.productId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          seller: req.body.seller,
        },
      }
    );
    res.status(200).json({ updatedOne, success: 1 });
  } catch (err) {
    res.json({ message: err, success: 0 });
  }
});

module.exports = router;
