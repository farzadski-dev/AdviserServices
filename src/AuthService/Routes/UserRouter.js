const express = require("express"),
	_container = require("../Di/DiContainer").get(),
	AuthController = require("../Controllers/AuthController"),
	{ login, singUp, allowTo, assignACategoryToThisUser, protect, GetAllUsers } =
		new AuthController(_container);

class UserRouter extends express.Router {
	constructor() {
		super();

		this.post("/login", login);
		this.post("/signup", singUp);
		this.put(
			"/assign-category-to-user",
			protect,
			allowTo("admin"),
			assignACategoryToThisUser,
		);

		this.get("/", protect, allowTo("admin"), GetAllUsers);
	}
}

module.exports = UserRouter;

// router.post("/signup", auth.singUp);
// router.post("/login", auth.login);
//
// router.put(
// 	"/assign-category-to-user",
// 	auth.protect,
// 	auth.allowTo("admin"),
// 	auth.assignACategoryToThisUser
// );
//
// router.put(
// 	"/change-role-of-user",
// 	auth.protect,
// 	auth.allowTo("admin"),
// 	auth.changeRoleOfThisUser
// );
