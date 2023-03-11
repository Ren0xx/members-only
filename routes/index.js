var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET home page. */
const app = express();

router.get("/", function (req, res, next) {
    res.render("layout", { title: "Members only", user: req.user });
});

router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_signup_post);

router.get("/sign-in", userController.user_login_get);
router.get("/log-out", userController.user_logout_get);
router.post("/sign-in", userController.user_login_post);

module.exports = router;
