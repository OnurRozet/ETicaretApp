const express = require('express');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post(`/register`, async (req, res) => {
  try {
    const user = new User(req.body);
    user._id = uuidv4();
    user.isAdmin = false;

    const checkUserEmail = await User.findOne({ email: user.email });
    if (checkUserEmail !== null) {
      return res
        .status(403)
        .json({ message: "Bu mail adresi daha önce kullanılmış" });
    } else {
      await user.save();

      const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
        expiresIn: "1d",
      });

      let model = {
        user: user,
        token: token,
      };

      res.status(201).json(model);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(`/login`, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Şifre yanlış" });
    }

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1d",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;