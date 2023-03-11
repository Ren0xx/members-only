var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");
/* GET home page. */
const app = express();

router.get("/", function (req, res, next) {
    res.render("layout", { title: "Members only", user: req.user });
});

router.get("/sign-up", userController.user_create_get);

router.get("/sign-in", userController.user_login_get);

router.get("/log-out", userController.user_logout_get);

router.post("/sign-up", async (req, res, next) => {
    const hashPassword = (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hashed) => {
                if (err) reject(err);
                resolve(hashed);
            });
        });
    };
    const hashed = await hashPassword(req.body.password);
    const user = new User({
        username: req.body.username,
        password: hashed,
    });
    user.save()
        .then(() => {
            res.redirect("/sign-in");
        })
        .catch((err) => {
            return next(err);
        });
});
module.exports = router;
