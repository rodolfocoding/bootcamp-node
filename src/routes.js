const express = require("express");
const AuthController = require("./controllers/auth-controller");

const router = express.Router();

router.post("/user/register", AuthController.create);

module.exports = router;
