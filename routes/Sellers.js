const express = require("express");
const Seller = require("../models/Seller");
const router = express.Router();
//new product
router.post("/newseller", async (req, res) => {
  const seller = new Seller({
    sellerName: req.body.sellerName,
    Location: req.body.Location,
    ProfitPercentage: req.body.ProfitPercentage,
    SupportEmail: req.body.SupportEmail,
  });

  try {
    const savedSeller = await seller.save();
    res.status(200).json({ savedSeller, success: 1 });
  } catch (err) {
    res.json({ message: err, success: 0 });
  }
});
//get all the sellers name
router.get("/", async (req, res) => {
  try {
    const result = await Seller.find();
    const sellers = result.map((item) => item["sellerName"]);

    res.status(200).json(sellers);
  } catch (err) {
    res.json({ message: err });
  }
});
//get all seller with details
router.get("/all", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.json({ message: err });
  }
});
//get seller by id
router.get("/:sellerId", async (req, res) => {
  try {
    const seller = await Seller.find({ _id: req.params.sellerId });
    res.status(200).json({ seller, success: 1 });
  } catch (err) {
    res.json({
      message: err,
      success: 0,
    });
  }
});
//deleting a seller
router.delete("/:sellerId", async (req, res) => {
  try {
    const removedSeller = await Seller.deleteOne({ _id: req.params.sellerId });
    res.status(200).json({ removedSeller, success: 1 });
  } catch (err) {
    res.json({ message: err, success: 0 });
  }
});

router.patch("/:sellerId", async (req, res) => {
  try {
    const updatedOne = await Seller.updateOne(
      { _id: req.params.sellerId },
      {
        $set: {
          sellerName: req.body.sellerName,
          Location: req.body.Location,
          ProfitPercentage: req.body.ProfitPercentage,
          SupportEmail: req.body.SupportEmail,
        },
      }
    );
    res.status(200).json({ updatedOne, success: 1 });
  } catch (err) {
    res.json({ message: err, success: 0 });
  }
});

module.exports = router;
