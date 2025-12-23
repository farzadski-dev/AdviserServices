const {Answer, User, Question} = require("../models");

const TAG = "app:AnswerController";
const myDebugger = require("../utils/debugger")(TAG);

const catchAsync = require("../utils/catchAsync");

exports.createAnAnswerForThisQuestion = catchAsync(async (request, response, next) => {
    const {questionId} = request.params;
    const {title, description, answer, seo} = request.body;
    const userId = request.user.id;

    const newAnswer = await Answer.create({
        title, description, answer, seo, questionId, userId
    });

    response.status(201).json({
        status: "success", data: {
            answer: newAnswer
        }
    });
});

exports.getAnswer = catchAsync(async (request, response, next) => {
    const {answerId} = request.params;
    const answer = await Answer.findByPk(answerId, {
        include: [{
            model: User,
            as: "belongs_user",
            attributes: {exclude: ["password", "role"]}
        }, {
            model: Question, as: "belongs_question"
        }]
    });
    response.status(200).json({
        status: "success", data: {
            answer
        }
    });
});

exports.getAllAnswers = catchAsync(async (request, response, next) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    if (request.params.questionId !== undefined) return next();

    const answers = await Answer.findAll({
        include: [{
            model: User,
            as: "belongs_user",
            attributes: {exclude: ["password", "role"]}
        }, {
            model: Question, as: "belongs_question"
        }], limit, offset: skip
    });

    response.status(200).json({
        status: "success", data: {
            answers
        }
    });
});

exports.updateThisAnswer = catchAsync(async (request, response, next) => {
    const {answerId} = request.params;
    const {title, description, answer, seo} = request.body;

    const updatedAnswer = await Answer.update({
        title, description, answer, seo
    }, {
        where: {id: answerId},
        returning: true
    });

    response.status(200).json({
        status: "success", data: {
            answer: {...updatedAnswer[1]}["0"]
        }
    });
});

exports.deleteThisAnswer = catchAsync(async (request, response, next) => {
    const {answerId} = request.params;

    await Answer.destroy({
        where: {id: answerId}
    });

    response.status(204).json({
        status: "success",
    });
});

exports.getAllAnswersForThisQuestion = catchAsync(async (request, response, next) => {
    const {questionId} = request.params;

    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    myDebugger(questionId);

    const answers = await Answer.findAll({
        include: [{
            model: User,
            as: "belongs_user",
            attributes: {exclude: ["password", "role"]}
        }], where: {questionId}, limit, offset: skip
    });

    response.status(200).json({
        status: "success", data: {
            answers,
        }
    });
});