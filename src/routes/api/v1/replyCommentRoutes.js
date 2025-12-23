const express = require("express");
const router = express.Router({ mergeParams: true });

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const ReplyCommentController = require("../../../controllers/ReplyCommentController");
const CommentController = require("../../../controllers/CommentController");

router
	.route("/")
	.post(auth.protect, ReplyCommentController.createReplyCommentOnComment)
	.get(ReplyCommentController.getAllReplyCommentOnThisComment);

router
	.route("/:replyCommentId")
	.get(ReplyCommentController.getThisReplyComment)
	.put(ReplyCommentController.updateAReplyComment)
	.delete(ReplyCommentController.deleteThisReplyComment);

router.put(
	"/:replyCommentId/likes",
	ReplyCommentController.likeThisReplyComment
);

router.put(
	"/:replyCommentId/dislikes",
	ReplyCommentController.dislikeThisReplyComment
);

module.exports = router;
