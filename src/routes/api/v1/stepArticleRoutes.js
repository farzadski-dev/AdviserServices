const express = require("express");
const router = express.Router({ mergeParams: true });

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const ArticleChildController = require("../../../controllers/ArticleChildController");

const isBelongsToThisUser = require("../../../middlewares/isBelongsToThisUserMiddleware");

router.use(auth.protect);

router
	.route("/")
	.post(
		isBelongsToThisUser.isThisArticleBelongsToThisUser,
		ArticleChildController.addArticleStepToThisParentArticle
	);

router
	.route("/:articleChildId")
	.put(
		isBelongsToThisUser.isThisArticleBelongsToThisUser,
		ArticleChildController.updateArticleChild
	)
	.delete(
		isBelongsToThisUser.isThisArticleBelongsToThisUser,
		ArticleChildController.deleteArticleChild
	);

module.exports = router;
