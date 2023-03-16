const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
// sign-up route - get
exports.user_create_get = (req, res) => {
    if (req.user) res.redirect("/");
    res.render("sign-up", { title: "Sign up", errors: [] });
};
// logout - get
exports.user_logout_get = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect("/");
    });
};

// sign-in route - get
exports.user_signin_get = (req, res) => {
    if (req.user) res.redirect("/");
    console.log(req.session.messages);
    res.render("sign-in", { title: "Sign in" });
};

// sign-up - post
exports.user_signup_post = [
    body("username", "Please enter a valid username").isLength({ min: 5 }),

    // Validate password
    body("password", "Password should be at least 8 characters long").isLength({
        min: 8,
    }),

    // Validate confirm password
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("sign-up", { title: "Sign up", errors: errors.array() });
            return;
        }
        const { username } = req.body;
        const userExists = await User.findOne({ username: username });
        if (userExists) {
            errors.errors.push({ msg: "Username already taken" });
            res.render("sign-up", { title: "Sign up", errors: errors.array() });
            return;
        }
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
    },
];
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username })
            .then((user) => {
                if (!user)
                    return done(null, false, { message: "Incorrect username" });
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        // passwords match! log user in
                        return done(null, user);
                    } else {
                        // passwords do not match!
                        return done(null, false, {
                            message: "Incorrect password",
                        });
                    }
                });
            })
            .catch((err) => {
                return done(err);
            });
    })
);
exports.user_signin_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
