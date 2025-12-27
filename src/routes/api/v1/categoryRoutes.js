const express = require("express");
const router = express.Router({ mergeParams: true });

const _container = require("../../../AuthService/Di/DiContainer").get(),
	AuthController = require("../../../AuthService/Controllers/AuthController"),
	{ protect, allowTo } = new AuthController(_container);

const CategoryController = require("../../../controllers/CategoryController");

const questionRouter = require("./questionRoutes");

router.use("/:categoryId/questions", questionRouter);

router
	.route("/")
	.post(protect, allowTo("admin"), CategoryController.createParentCategory)
	.get(CategoryController.getAllCategories);

router
	.route("/:categoryId/children")
	.post(
		protect,
		allowTo("admin"),
		CategoryController.createChildForParentCategory,
	);

router
	.route("/:categoryId")
	.get(CategoryController.getChildrenOfThisCategory)
	.put(protect, allowTo("admin"), CategoryController.updateThisCategory)
	.delete(protect, allowTo("admin"), CategoryController.deleteThisCategory);

module.exports = router;
