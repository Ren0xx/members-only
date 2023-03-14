const Message = require("../models/message");
const User = require("../models/user");
const async = require("async");

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
    Message.find({})
        .sort({ title: 1 })
        .populate("owner")
        .then((messages) => {
            res.render("layout", {
                title: "Members only",
                user: req.user,
                messages: messages,
            });
        })
        .catch((err) => next(err));
};
exports.delete_message_post = (req, res, next) => {
    const messageId = req.body.message_id;
    const ownerId = req.body.message_owner;
    if (!req.user || req.user._id !== ownerId) res.redirect("/");
    Message.findByIdAndRemove(messageId)
        .then(() => res.redirect("/"))
        .catch((err) => next(err));
};
