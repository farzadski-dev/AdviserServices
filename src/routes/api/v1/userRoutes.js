const express = require("express");
const router = express.Router();

const TAG = "app:userRoutes";
const myDebugger = require("../../../utils/debugger")(TAG);

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

router.post("/signup", auth.singUp);
router.post("/login", auth.login);

router.put(
	"/assign-category-to-user",
	auth.protect,
	auth.allowTo("admin"),
	auth.assignACategoryToThisUser
);

router.put(
	"/change-role-of-user",
	auth.protect,
	auth.allowTo("admin"),
	auth.changeRoleOfThisUser
);

module.exports = router;
