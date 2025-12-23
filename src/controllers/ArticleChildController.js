const { ArticleStep } = require('../models');

const TAG = 'app:ArticleChildController';
const myDebugger = require('../utils/debugger')(TAG);

const catchAsync = require('../utils/catchAsync');

exports.addArticleStepToThisParentArticle = catchAsync(
	async (request, response, next) => {
		const { subject, article, categoryId, seo } = request.body;
		const { articleId } = request.params;

		const newArticleStep = await ArticleStep.create({
			articleId,
			subject,
			article,
			categoryId,
			seo,
		});
		response.status(201).json({
			status: 'success',
			data: {
				article_step: newArticleStep,
			},
		});
	}
);

exports.updateArticleChild = catchAsync(async (request, response, next) => {
	const { subject, article, seo } = request.body;
	const { articleChildId } = request.params;

	const newArticle = await ArticleStep.update(
		{ subject, article, seo },
		{
			where: {
				id: articleChildId,
			},
			returning: true,
		}
	);

	response.status(200).json({
		status: 'success',
		data: {
			articleStep: { ...newArticle[1] }['0'],
		},
	});
});

exports.deleteArticleChild = catchAsync(async (request, response, next) => {
	const { articleChildId } = request.params;
	await ArticleStep.destroy({ where: { id: articleChildId } });

	response.status(204).json({
		status: 'success',
	});
});
