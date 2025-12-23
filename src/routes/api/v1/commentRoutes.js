const express = require("express");
const router = express.Router({ mergeParams: true });

const replyCommentRouter = require("./replyCommentRoutes");

router.use("/:commentId/reply-comments", replyCommentRouter);

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const CommentController = require("../../../controllers/CommentController");

router
	.route("/")
	.post(auth.protect, CommentController.createCommentOnArticle)
	.get(CommentController.getAllComentOnThisArticle);

router
	.route("/:commentId")
	.get(CommentController.getThisComment)
	.put(
		auth.protect,
		CommentController.isThisCommentBelongsToThisUser,
		CommentController.updateThisComment
	)
	.delete(
		auth.protect,
		CommentController.isThisCommentBelongsToThisUser,
		CommentController.deleteThisComment
	);

router.put("/:commentId/likes", CommentController.likeThisComment);

router.put("/:commentId/dislikes", CommentController.dislikeThisComment);

module.exports = router;
