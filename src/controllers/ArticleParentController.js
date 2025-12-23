const { Article, ArticleStep, Category } = require('../models');

const TAG = 'app:ArticleParentController';
const myDebugger = require('../utils/debugger')(TAG);

const catchAsync = require('../utils/catchAsync');

exports.createParentArticle = catchAsync(async (request, response, next) => {
	const { subject, article, seo, categoryId } = request.body;
	const userId = request.user.id;

	const newArticle = await Article.create({
		subject,
		article,
		userId,
		categoryId,
		seo,
	});
	response.status(201).json({
		status: 'success',
		data: {
			article: newArticle,
		},
	});
});

exports.getThisArticle = catchAsync(async (request, response, next) => {
	const { articleId } = request.params;
	const article = await Article.findAll({
		where: {
			id: articleId,
		},
		include: [
			{
				model: ArticleStep,
				as: 'article_steps',
			},
			{
				model: Category,
				as: 'belongs_article_category',
			},
		],
	});
	response.status(200).json({
		status: 'success',
		data: {
			article,
		},
	});
});

exports.getAllArticles = catchAsync(async (request, response, next) => {
	const page = request.query.page * 1 || 1;
	const limit = request.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	const articles = await Article.findAll({
		include: [
			{
				model: ArticleStep,
				as: 'article_steps',
			},
		],
		limit,
		offset: skip,
	});

	response.status(200).json({
		status: 'success',
		data: {
			articles,
		},
	});
});

exports.updateParentArticle = catchAsync(async (request, response, next) => {
	const { subject, article, seo } = request.body;
	const { articleId } = request.params;

	const newArticle = await Article.update(
		{ subject, article, seo },
		{
			where: {
				id: articleId,
			},
			returning: true,
		}
	);

	response.status(200).json({
		status: 'success',
		data: {
			article: { ...newArticle[1] }['0'],
		},
	});
});

exports.deleteParentArticle = catchAsync(async (request, response, next) => {
	const { articleId } = request.params;
	await Article.destroy({ where: { id: articleId } });
	response.status(204).json({
		status: 'success',
	});
});
