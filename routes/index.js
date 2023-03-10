var express = require("express");
var router = express.Router();

const message_controller = require("../controllers/messageController");
const userController = require("../controllers/userController");
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("layout", { title: "Members only" });
});

router.get("/sign-up", userController.user_create_get);

router.get("/sign-in", userController.user_login_get);


module.exports = router;
