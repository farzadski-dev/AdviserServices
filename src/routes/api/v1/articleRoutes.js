const express = require("express");
const router = express.Router();

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const ArticleParentController = require("../../../controllers/ArticleParentController");

const {
	isThisArticleBelongsToThisUser,
	isThisUserBelongsToThisCategory,
} = require("../../../middlewares/isBelongsToThisUserMiddleware");

const commentRouter = require("./commentRoutes");
const stepArticleRouter = require("./stepArticleRoutes");

router.use("/:articleId/comments", commentRouter);
router.use("/:articleId/children", stepArticleRouter);

router.use(auth.protect);

router
	.route("/")
	.post(
		isThisUserBelongsToThisCategory,
		ArticleParentController.createParentArticle
	)
	.get(ArticleParentController.getAllArticles);

router
	.route("/:articleId")
	.get(ArticleParentController.getThisArticle)
	.put(
		isThisArticleBelongsToThisUser,
		ArticleParentController.updateParentArticle
	)
	.delete(
		isThisArticleBelongsToThisUser,
		ArticleParentController.deleteParentArticle
	);

module.exports = router;
