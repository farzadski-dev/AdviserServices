const express = require("express");
const router = express.Router({ mergeParams: true });

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const CategoryController = require("../../../controllers/CategoryController");

const questionRouter = require("./questionRoutes");

router.use("/:categoryId/questions", questionRouter);

router
	.route("/")
	.post(
		auth.protect,
		auth.allowTo("admin"),
		CategoryController.createParentCategory
	)
	.get(CategoryController.getAllCategories);

router
	.route("/:categoryId/children")
	.post(
		auth.protect,
		auth.allowTo("admin"),
		CategoryController.createChildForParentCategory
	);

router
	.route("/:categoryId")
	.get(CategoryController.getChildrenOfThisCategory)
	.put(
		auth.protect,
		auth.allowTo("admin"),
		CategoryController.updateThisCategory
	)
	.delete(
		auth.protect,
		auth.allowTo("admin"),
		CategoryController.deleteThisCategory
	);

module.exports = router;
