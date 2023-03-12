const Message = require("../models/message");
exports.create_message_get = (req, res, next) => {
    if (!req.user) res.redirect("/");
    res.render("create-message", { title: "Create Message" });
};
exports.create_message_post = (req, res, next) => {
    if (!req.user) return;
    const message = new Message({
        title: req.body.title,
        content: req.body.content,
        owner: req.user.id,
    });
    // TODO sanitize etc
    message
        .save()
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => next(err));
};
exports.index_get = (req, res, next) => {
    Message.find()
        .sort([["timestamp", "ascending"]])
        .limit(25)
        .then((messages) => {
            res.render("layout", {
                title: "Members only",
                user: req.user,
                messages: messages,
            });
        })
        .catch((err) => next(err));
};
