const express = require("express");
const router = express.Router({ mergeParams: true });

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const AnswerController = require("../../../controllers/AnswerController");

const {
	isThisAnswerBelongsToThisUser,
} = require("../../../middlewares/isBelongsToThisUserMiddleware");

router
	.route("/")
	.post(auth.protect, AnswerController.createAnAnswerForThisQuestion)
	.get(auth.protect, auth.allowTo("admin"), AnswerController.getAllAnswers)
	.get(AnswerController.getAllAnswersForThisQuestion);

router
	.route("/:answerId")
	.get(AnswerController.getAnswer)
	.put(
		auth.protect,
		isThisAnswerBelongsToThisUser,
		AnswerController.updateThisAnswer
	)
	.delete(
		auth.protect,
		isThisAnswerBelongsToThisUser,
		AnswerController.deleteThisAnswer
	);

module.exports = router;
