const {Question, User, Category} = require("../models");

const TAG = "app:QuestionController";
const myDebugger = require("../utils/debugger")(TAG);

const catchAsync = require("../utils/catchAsync");

exports.createQuestion = catchAsync(async (request, response, next) => {
    const {categoryId} = request.params;
    const {title, description, question, seo} = request.body;
    const userId = request.user.id;

    const newQuestion = await Question.create({
        title,
        description,
        question,
        seo,
        categoryId,
        userId
    });
    response.status(201).json({
        status: "success",
        data: {
            question: newQuestion
        }
    });
});

exports.getQuestion = catchAsync(async (request, response, next) => {
    const {questionId} = request.params;
    const question = await Question.findByPk(questionId, {
        include: [{
            model: User,
            as: "belongs_user",
            attributes: {exclude: ["password", "role"]}
        }, {
            model: Category,
            as: "belongs_category"
        }]
    });
    response.status(200).json({
        status: "success",
        data: {
            question
        }
    });
});

exports.getAllQuestion = catchAsync(async (request, response, next) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    if (request.categoryId !== undefined)
        return next();

    const questions = await Question.findAll({
        include: [
            {
                model: User,
                as: "belongs_user",
                attributes: {exclude: ["password", "role"]}
            }, {
                model: Category,
                as: "belongs_category"
            }
        ],
        limit,
        offset: skip
    });

    response.status(200).json({
        status: "success",
        data: {
            questions
        }
    });
});

exports.updateThisQuestion = catchAsync(async (request, response, next) => {
    const {questionId} = request.params;
    const {title, description, question, seo} = request.body;

    const updatedQuestion = await Question.update({
        title,
        description,
        question,
        seo
    }, {
        where: {id: questionId},
        returning: true
    });

    response.status(200).json({
        status: "success",
        data: {
            question: {...updatedQuestion[1]}["0"]
        }
    });
});

exports.deleteThisQuestion = catchAsync(async (request, response, next) => {
    const {questionId} = request.params;

    await Question.destroy({
        where: {
            id: questionId
        }
    });

    response.status(204).json({
        status: "success"
    });
});

exports.getAllQuestionsBaseOnThisCategory = catchAsync(async (request, response, next) => {
    const {categoryId} = request.params;

    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const questions = await Question.findAll({
        include: [{
            model: User,
            as: "belongs_user",
            attributes: {exclude: ["password", "role"]}
        }, {
            model: Category,
            as: "belongs_category"
        }],
        where: {
            categoryId
        },
        limit,
        offset: skip
    });

    response.status(200).json({
        status: "success",
        data: {
            questions
        }
    });
});