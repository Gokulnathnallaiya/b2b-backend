const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
//new product
router.post("/newproduct", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    seller:req.body.seller,
  });
 
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
    res.status(200).json({product,success:1});
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
          seller:req.body.seller,
        },
      }
    );
    res.status(200).json({ updatedOne, success: 1 });
  } catch (err) {
    res.json({ message: err, success: 0 });
  }
});

module.exports = router;
