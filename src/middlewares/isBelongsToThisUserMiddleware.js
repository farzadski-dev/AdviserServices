const catchAsync = require("../utils/catchAsync");
const {Article, Question, Answer} = require("../models");

const TAG = "app:isBelongsYoThisUserMiddleware";
const myDebugger = require("../utils/debugger")(TAG);

exports.isThisArticleBelongsToThisUser = catchAsync(async (request, response, next) => {
    const {articleId} = request.params;
    const userId = request.user.id;

    if (request.user.role === "admin")
        return next();

    const article = await Article.findOne({
        where: {id: articleId}
    });

    if (!article) {
        return response.status(404).json({
            status: "failed",
            errorMessage: `This article step with this id: ${articleId} not exist!`
        });
    }

    if (article.userId !== userId) {
        return response.status(409).json({
            status: "failed",
            errorMessage: `This comment with this id: ${articleId} not belongs to this user!`
        });
    }
    next();
});

exports.isThisUserBelongsToThisCategory = catchAsync(async (request, response, next) => {
    if (request.user.role === "admin")
        return next();

    if (request.user.categoryId === null)
        return response.status(403).json({
            status: "failed",
            errorMessage: "You do not have permission to perform this action."
        });

    if (request.user.categoryId !== request.params.categoryId)
        return response.status(403).json({
            status: "failed",
            errorMessage: "You do not have permission to perform this action."
        });

    next();
});

exports.isThisQuestionBelongsToThisUser = catchAsync(async (request, response, next) => {
    const {questionId} = request.params;
    const userId = request.user.id;

    if (request.user.role === "admin")
        return next();

    const question = await Question.findByPk(questionId);

    if (!question) {
        return response.status(404).json({
            status: "failed",
            errorMessage: `This question with this id: ${questionId} not exist!`
        });
    }

    if (question.userId !== userId) {
        return response.status(409).json({
            status: "failed",
            errorMessage: `This question with this id: ${questionId} not belongs to this user!`
        });
    }
    next();
});

exports.isThisAnswerBelongsToThisUser = catchAsync(async (request, response, next) => {
    const {answerId} = request.params;
    const userId = request.user.id;

    if (request.user.role === "admin")
        return next();

    const answer = await Answer.findByPk(answerId);

    if (!answer) {
        return response.status(404).json({
            status: "failed",
            errorMessage: `This answer with this id: ${answerId} not exist!`
        });
    }

    if (answer.userId !== userId) {
        return response.status(409).json({
            status: "failed",
            errorMessage: `This answer with this id: ${answerId} not belongs to this user!`
        });
    }
    next();
});