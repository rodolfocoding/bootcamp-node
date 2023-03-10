const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("email-validator");

const User = require("../models/user");

class AuthController {
  async create(req, res) {
    try {
      let { name, email, password, confirmPassword } = req.body;

      const emailIsValid = validate(email);

      if (!name) {
        return res.status(422).json({ msg: "Name is required!" });
      }

      if (!email) {
        return res.status(422).json({ msg: "Email is required!" });
      }

      if (!emailIsValid) {
        return res.status(422).json({ msg: "Invalid Email!" });
      }

      if (!password) {
        return res.status(422).json({ msg: "Password is required!" });
      }

      if (password != confirmPassword) {
        return res.status(422).json({ msg: "Passwords do not match!" });
      }

      const userExists = await User.findOne({ email: email });

      if (userExists) {
        return res.status(422).json({ msg: "User already exists!" });
      }

      const salt = await bcrypt.genSalt(12);

      password = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password,
      });

      await user.save();

      res.status(201).json({ msg: "User successfully created!" });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  }
}

module.exports = new AuthController();
