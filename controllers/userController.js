exports.user_create_get = (req, res, next) => {
    res.render("sign-up", { title: "Sign up" });
};
exports.user_login_get = (req, res, next) => {
    res.render("sign-in", { title: "Sign in" });
};

exports.user_logout_get = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect("/");
    });
};
exports.user_signup_post = (req, res, next) => {
    
}
