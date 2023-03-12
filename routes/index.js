var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Message = require("../models/message");
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET home page. */
const app = express();
const messages = Message.find();
router.get("/", messageController.index_get);

router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_signup_post);

router.get("/sign-in", userController.user_signin_get);
router.get("/log-out", userController.user_logout_get);
router.post("/sign-in", userController.user_signin_post);

router.get("/create-message", messageController.create_message_get);
router.post("/create-message", messageController.create_message_post);
module.exports = router;
