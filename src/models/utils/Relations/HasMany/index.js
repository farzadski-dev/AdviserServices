const ArticleHasManyArticleStep = require('./Article/ArticleHasManyArticleStep');
const ArticleHasManyComment = require('./Article/ArticleHasManyComment');
const CommentHasManyReplyComment = require('./Comment/CommentHasManyReplyComment');
const QuestionHasManyAnswer = require('./Question/QuestionHasManyAnswer');

module.exports = {
	ArticleHasManyArticleStep,
	ArticleHasManyComment,
	CommentHasManyReplyComment,
	QuestionHasManyAnswer,
};
