const express = require("express");
const router = express.Router({ mergeParams: true });

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const QuestionController = require("../../../controllers/QuestionController");

const answerRouter = require("./answerRoutes");

router.use("/:questionId/answers", answerRouter);

const {
	isThisQuestionBelongsToThisUser,
} = require("../../../middlewares/isBelongsToThisUserMiddleware");

router
	.route("/")
	.post(auth.protect, QuestionController.createQuestion)
	.get(auth.protect, auth.allowTo("admin"), QuestionController.getAllQuestion)
	.get(
		auth.protect,
		auth.allowTo("admin"),
		QuestionController.getAllQuestionsBaseOnThisCategory
	);

router
	.route("/:questionId")
	.get(QuestionController.getQuestion)
	.put(
		auth.protect,
		isThisQuestionBelongsToThisUser,
		QuestionController.updateThisQuestion
	)
	.delete(
		auth.protect,
		isThisQuestionBelongsToThisUser,
		QuestionController.deleteThisQuestion
	);

module.exports = router;
