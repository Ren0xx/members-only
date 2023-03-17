var express = require("express");
var router = express.Router();
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", messageController.index_get);

router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_signup_post);

router.get("/sign-in", userController.user_signin_get);
router.get("/log-out", userController.user_logout_get);
router.post("/sign-in", userController.user_signin_post);

router.get("/create-message", messageController.create_message_get);
router.post("/create-message", messageController.create_message_post);

router.post("/delete-message", messageController.delete_message_post);

router.get("/become-admin", userController.become_admin_get);
router.post("/become-admin", userController.become_admin_post);
module.exports = router;
