const Message = require("../models/message");
const User = require("../models/user");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res, next) => {
    if (!req.user) res.redirect("/");
    res.render("create-message", { title: "Create Message", errors: [] });
};
exports.create_message_post = [
    body("title", "Title must not be empty")
        .trim()
        .isLength({ min: 1, max: 70 })
        .escape(),
    body("content", "Content must not be empty")
        .trim()
        .isLength({ min: 1, max: 255 })
        .escape(),

    (req, res, next) => {
        if (!req.user) return;
        const errors = validationResult(req);
        const message = new Message({
            title: req.body.title,
            content: req.body.content,
            owner: req.user.id,
        });
        if (!errors.isEmpty()) {
            res.render("create-message", {
                title: "Create Message",
                errors: errors.array(),
            });
            return;
        }
        message
            .save()
            .then(() => {
                res.redirect("/");
            })
            .catch((err) => next(err));
    },
];
exports.index_get = (req, res, next) => {
    Message.find({})
        .sort({ _id: -1 })
        .limit(25)
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
