const ArticleBelongsToUser = require('./Article/ArticleBelongsToUser');
const ArticleBelongsToCategory = require('./Article/ArticleBelongsToCategory');
const ArticleStepBelongsToCategory = require('./ArticleStep/ArticleStepBelongsToCategory');
const ArticleStepBelongsToArticle = require('./ArticleStep/ArticleStepBelongsToArticle');
const UserBelongsToCategory = require('./User/UserBelongsToCategory');
const CommentBelongsToArticle = require('./Comment/CommentBelongsToArticle');
const CommentBelongsToUser = require('./Comment/CommentBelongsToUser');
const ReplyCommentBelongsToComment = require('./ReplyComment/ReplyCommentBelongsToComment');
const ReplyCommentBelongsToUser = require('./ReplyComment/ReplyCommentBelongsToUser');
const RoomBelongsToCategory = require('./Room/RoomBelongsToCategory');
const TicketBelongsToRoom = require('./Ticket/TicketBelongsToRoom');
const TicketBelongsToUser = require('./Ticket/TicketBelongsToUser');
const RoomBelongsToUser = require('./Room/RoomBelongsToUser');
const QuestionBelongsToCategory = require('./Question/QuestionBelongsToCategory');
const QuestionBelongsToUser = require('./Question/QuestionBelongsToUser');
const AnswerBelongsToUser = require('./Answer/AnswerBelongsToUser');
const AnswerBelongsToQuestion = require('./Answer/AnswerBelongsToQuestion');

module.exports = {
	ArticleBelongsToUser,
	ArticleBelongsToCategory,
	ArticleStepBelongsToCategory,
	ArticleStepBelongsToArticle,
	UserBelongsToCategory,
	CommentBelongsToArticle,
	CommentBelongsToUser,
	ReplyCommentBelongsToComment,
	ReplyCommentBelongsToUser,
	RoomBelongsToCategory,
	TicketBelongsToRoom,
	TicketBelongsToUser,
	RoomBelongsToUser,
	QuestionBelongsToCategory,
	QuestionBelongsToUser,
	AnswerBelongsToUser,
	AnswerBelongsToQuestion,
};
