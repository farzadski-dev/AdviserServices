const AuthServiceDi = require("../AuthService/Di/DiContainer").get();
const { Article, ArticleStep, Category } = require("./Article");
const { Comment, ReplyComment } = require("./Comment");
const { Room, ReserveRoom, Ticket } = require("./Room");
const { WorkTime, WorkTimeRoom } = require("./WorkTime");
const { Answer, Question } = require("./QA/");

const {
	ArticleHasManyArticleStep,
	ArticleHasManyComment,
	CommentHasManyReplyComment,
	QuestionHasManyAnswer,
} = require("./utils/Relations/HasMany");

const {
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
} = require("./utils/Relations/BelongsTo");

const {
	RoomBelongsToManyWorkTime,
	WorkTimeBelongsToManyRoom,
} = require("./utils/Relations/BelongsToMany");

new ArticleHasManyArticleStep(Article, ArticleStep).put();
new ArticleHasManyComment(Article, Comment).put();
new CommentHasManyReplyComment(Comment, ReplyComment).put();
new QuestionHasManyAnswer(Question, Answer).put();

new ArticleBelongsToUser(Article, AuthServiceDi.Models.UserModel).put();
new ArticleBelongsToCategory(Article, Category).put();
new ArticleStepBelongsToCategory(ArticleStep, Category).put();
new ArticleStepBelongsToArticle(ArticleStep, Article).put();
new UserBelongsToCategory(AuthServiceDi.Models.UserModel, Category).put();
new CommentBelongsToArticle(Comment).put();
new CommentBelongsToUser(Comment, AuthServiceDi.Models.UserModel).put();
new ReplyCommentBelongsToComment(ReplyComment).put();
new ReplyCommentBelongsToUser(
	ReplyComment,
	AuthServiceDi.Models.UserModel
).put();
new RoomBelongsToCategory(Room, Category).put();
new TicketBelongsToRoom(Ticket, Room).put();
new TicketBelongsToUser(Ticket, AuthServiceDi.Models.UserModel).put();
new RoomBelongsToUser(Room, AuthServiceDi.Models.UserModel).put();
new QuestionBelongsToUser(Question, AuthServiceDi.Models.UserModel).put();
new AnswerBelongsToUser(Answer, AuthServiceDi.Models.UserModel).put();
new AnswerBelongsToQuestion(Answer, Question).put();
new QuestionBelongsToCategory(Question, Category).put();

new RoomBelongsToManyWorkTime(Room, WorkTime, WorkTimeRoom).put();
new WorkTimeBelongsToManyRoom(WorkTime, Room, WorkTimeRoom).put();

module.exports = {
	Article,
	ArticleStep,
	Comment,
	ReplyComment,
	Room,
	ReserveRoom,
	Ticket,
	WorkTime,
	Category,
	WorkTimeRoom,
	Question,
	Answer,
};
