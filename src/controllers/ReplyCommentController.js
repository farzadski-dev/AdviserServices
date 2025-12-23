const {ReplyComment, User, Comment} = require("../models");

const catchAsync = require("../utils/catchAsync");

exports.createReplyCommentOnComment = catchAsync(async (request, response, next) => {
    const {commentId} = request.params;
    const {comment, seo} = request.body;

    const userId = request.user.id;

    const newReplyComment = await ReplyComment.create({
        commentId,
        userId,
        comment,
        seo
    });

    response.status(201).json({
        status: "success",
        data: {
            replyComment: newReplyComment
        }
    });
});

exports.getAllReplyCommentOnThisComment = catchAsync(async (request, response, next) => {
    const {commentId} = request.params;

    let comment = {
        commentParent: {},
        replyComments: []
    };
    comment.commentParent = await Comment.findByPk(commentId, {
        include: [{
            model: User,
            as: "belongs_user",
            attributes: {exclude: ["password"]}
        }],
    });
    comment.replyComments = await ReplyComment.findAll(
        {
            include: [{
                model: User,
                as: "belongs_user",
                attributes: {exclude: ["password"]}
            }],
            where: {commentId}
        });

    response.status(200).json({
        status: "success",
        data: {
            comment
        }
    });

});

exports.updateAReplyComment = catchAsync(async (request, response, next) => {
    const {replyCommentId} = request.params;
    const {comment, seo} = request.body;

    const updatedReplyComment = await ReplyComment.update({
        comment,
        seo
    }, {
        where: {id: replyCommentId},
        returning: true
    });

    response.status(200).json({
        status: "success",
        data: {
            replyComment: {...updatedReplyComment[1]}["0"]
        }
    });
});

exports.getThisReplyComment = catchAsync(async (request, response, next) => {
    const {replyCommentId} = request.params;
    const replyComment = await ReplyComment.findByPk(replyCommentId, {
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
            replyComment
        }
    });
});

exports.deleteThisReplyComment = catchAsync(async (request, response, next) => {
    const {replyCommentId} = request.params;

    await ReplyComment.destroy({where: {id: replyCommentId}});

    response.status(204).json({
        status: "success"
    });
});


exports.likeThisReplyComment = catchAsync(async (request, response, next) => {
    const {replyCommentId} = request.params;

    await ReplyComment.increment("like_counts", {
        by: 1,
        where: {id: replyCommentId}
    });

    response.status(200).json({
        status: "success"
    });
});

exports.dislikeThisReplyComment = catchAsync(async (request, response, next) => {
    const {replyCommentId} = request.params;

    const comment = await ReplyComment.findByPk(replyCommentId);

    if (comment.like_counts > 0)
        await ReplyComment.increment("like_counts", {
            by: -1,
            where: {id: replyCommentId}
        });

    response.status(200).json({
        status: "success"
    });
});
