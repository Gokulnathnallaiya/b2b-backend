const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const { compareSync } = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user, success: 1 });
  } catch (e) {
    res.status(400).send({ e, success: 0 });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log(user);
    const passwordMatch = compareSync(req.body.password, user.password);

    if (user && passwordMatch) {
      const { email } = req.body;
      return res
        .status(200)
        .json({ email, success: 1, message: "Login successfull" });
    } else {
      return res.json({ success: 0, message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: "An error occured",
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  //
  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
