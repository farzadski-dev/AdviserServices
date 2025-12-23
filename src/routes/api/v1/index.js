const express = require("express");
const router = express.Router();

const UserRouter = require("../../../AuthService/Routes/UserRouter");
const roomRouter = require("./roomRoutes");
const categoryRouter = require("./categoryRoutes");
const articleRouter = require("./articleRoutes");
const stepArticleRouter = require("./stepArticleRoutes");
const commentRouter = require("./commentRoutes");
const replyCommentRouter = require("./replyCommentRoutes");
const workTimeRouter = require("./workTimeRoutes");
const ticketRouter = require("./ticketRoutes");
const questionRouter = require("./questionRoutes");
const answerRouter = require("./answerRoutes");

router.use("/users", new UserRouter());
router.use("/rooms", roomRouter);
router.use("/categories", categoryRouter);
router.use("/articles", articleRouter);
router.use("/articles/children", stepArticleRouter);
router.use("/comments", commentRouter);
router.use("/reply-comments", replyCommentRouter);
router.use("/work-times", workTimeRouter);
router.use("/tickets", ticketRouter);
router.use("/questions", questionRouter);
router.use("/answers", answerRouter);

module.exports = router;
