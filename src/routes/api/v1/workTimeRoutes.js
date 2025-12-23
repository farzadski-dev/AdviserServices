const express = require("express");
const router = express.Router({ mergeParams: true });

const roomRouter = require("./roomRoutes");

router.use("/:workTimeId/rooms", roomRouter);

const AuthController = require("../../../AuthService/Controllers/AuthController");
const auth = new AuthController();

const WorkTimeController = require("../../../controllers/WorkTimeController");

router
	.route("/")
	.post(auth.protect, auth.allowTo("admin"), WorkTimeController.createWorkTime)
	.get(
		auth.protect,
		auth.allowTo("admin"),
		WorkTimeController.getAllWorkTimesIncludeRooms
	);

router
	.route("/:workTimeId")
	.get(WorkTimeController.getOneWorkTimeIncludeRooms)
	.put(WorkTimeController.updateWorkTime)
	.delete(WorkTimeController.deleteWorkTime);

module.exports = router;
