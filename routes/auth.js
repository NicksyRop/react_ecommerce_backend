const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      JSON.stringify(req.body.password),
      process.env.PASS_KEY
    ).toString(),
  });

  try {
    const saveduser = await newUser.save();
    res.status(200).json(saveduser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const findUser = await User.findOne({
      username: req.body.username,
    });

    !findUser && res.status(500).json("Wrong credentials!!");

    const hashPass = CryptoJS.AES.decrypt(
      findUser.password,
      process.env.PASS_KEY
    ).toString(CryptoJS.enc.Utf8);

    var decryptedData = JSON.parse(hashPass.toString(CryptoJS.enc.Utf8));

    decryptedData !== req.body.password &&
      res.status(401).json("Wrong credentials!!!!");

    const accessToken = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "3d" }
    );

    const { password, ...others } = findUser._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
