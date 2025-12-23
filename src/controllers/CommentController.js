const {Comment, User} = require("../models");

const TAG = "app:CommentController";
const myDebugger = require("../utils/debugger")(TAG);

const catchAsync = require("../utils/catchAsync");

exports.isThisCommentBelongsToThisUser = catchAsync(async (request, response, next) => {
    const {commentId} = request.params;
    const userId = request.user.id;

    if (request.user.role === "admin")
        return next();

    const comment = await Comment.findByPk(commentId);

    if (!comment)
        return response.status(404).json({
            status: "failed",
            errorMessage: `This comment with this id: ${commentId} not exist!`
        });

    if (comment.userId !== userId)
        return response.status(409).json({
            status: "failed",
            errorMessage: `This comment with this id: ${commentId} not belongs to this user!`
        });

    next();
});

exports.createCommentOnArticle = catchAsync(async (request, response, next) => {
    const {articleId} = request.params;
    const {comment, seo} = request.body;
    const userId = request.user.id;

    const newComment = await Comment.create({
        articleId,
        userId,
        comment,
        seo
    });

    response.status(201).json({
        status: "success",
        data: {
            comment: newComment
        }
    });
});

exports.getThisComment = catchAsync(async (request, response, next) => {
    const {commentId} = request.params;

    const comment = await Comment.findOne({
        where: {id: commentId},
        include: [
            {
                model: User,
                as: "belongs_user",
                attributes: {exclude: ["password"]}
            }
        ]
    });

    response.status(200).json({
        status: "success",
        data: {
            comment
        }
    });
});

exports.deleteThisComment = catchAsync(async (request, response, next) => {
    const {commentId} = request.params;

    await Comment.destroy({where: {id: commentId}});

    response.status(204).json({
        status: "success"
    });
});

exports.updateThisComment = catchAsync(async (request, response, next) => {
    const {comment, seo} = request.body;
    const {commentId} = request.params;

    const updatedComment = await Comment.update({
        comment,
        seo
    }, {
        where: {id: commentId},
        returning: true
    });

    response.status(200).json({
        status: "success",
        data: {
            comment: {...updatedComment[1]}["0"]
        }
    });
});

exports.getAllComentOnThisArticle = catchAsync(async (request, response, next) => {
    const {articleId} = request.params;

    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const comments = await Comment.findAll({
        where: {articleId},
        include: [
            {
                model: User,
                as: "belongs_user",
                attributes: {exclude: ["password", "role"]}
            }
        ],
        limit,
        offset: skip
    });

    response.status(200).json({
        status: "success",
        data: {
            comments
        }
    });
});

exports.likeThisComment = catchAsync(async (request, response, next) => {
    const {commentId} = request.params;

    await Comment.increment("like_counts", {by: 1, where: {id: commentId}});

    response.status(200).json({
        status: "success"
    });
});

exports.dislikeThisComment = catchAsync(async (request, response, next) => {
    const {commentId} = request.params;

    const comment = await Comment.findByPk(commentId);

    if (comment.like_counts > 0)
        await Comment.increment("like_counts", {
            by: -1,
            where: {id: commentId}
        });

    response.status(200).json({
        status: "success"
    });
});
