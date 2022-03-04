const { VerifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

const router = require("express").Router();

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      JSON.stringify(req.body.password),
      process.env.PASS_KEY
    ).toString();
  }

  try {
    const updatedUser = User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
