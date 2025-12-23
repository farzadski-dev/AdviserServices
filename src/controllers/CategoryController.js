const {Op} = require("sequelize");
const {Category} = require("../models");

const TAG = "app:CategoryController";
const myDebugger = require("../utils/debugger")(TAG);

const catchAsync = require("../utils/catchAsync");

exports.createParentCategory = catchAsync(async (request, response, next) => {
    const {category_name, seo} = request.body;
    const category = await Category.create({
        category_name,
        seo
    });
    response.status(201).json({
        status: "success",
        data: {
            category
        }
    });
});

exports.getAllCategories = catchAsync(async (request, respons, next) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const categories = await Category.findAll({
        where: {parentId: null},
        limit, offset: skip
    });

    respons.status(200).json({
            status: "success",
            data: {
                categories
            }
        }
    );
});

exports.createChildForParentCategory = catchAsync(async (request, response, next) => {
    const {category_name, seo} = request.body;
    const {categoryId} = request.params;

    const childCategory = await Category.create({
        category_name,
        parentId: categoryId,
        seo
    });

    response.status(201).json({
        status: "success",
        data: {
            childCategory
        }
    });
});

exports.getChildrenOfThisCategory = catchAsync(async (request, response, next) => {
    const {categoryId} = request.params;
    let category = {
        categoryParent: {},
        childrenCategories: []
    };
    category.categoryParent = await Category.findByPk(categoryId);
    category.childrenCategories = await Category.findAll({where: {parentId: categoryId}});

    response.status(200).json({
        status: "success",
        data: {
            category
        }
    });
});

exports.updateThisCategory = catchAsync(async (request, response, next) => {
    const {category_name, seo} = request.body;
    const {categoryId} = request.params;

    const category = await Category.update({category_name, seo}, {
        where: {
            id: categoryId
        },
        returning: true
    });

    response.status(200).json({
        status: "success",
        data: {
            category: {...category[1]}["0"]
        }
    });
});

exports.deleteThisCategory = catchAsync(async (request, response, next) => {
    const {categoryId} = request.params;

    await Category.destroy({
        where: {
            [Op.or]: [
                {id: categoryId},
                {parentId: categoryId}
            ]
        }
    });
    response.status(204).json({
        status: "success"
    });
});